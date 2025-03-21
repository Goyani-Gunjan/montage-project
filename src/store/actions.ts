import * as THREE from "three";
import { MeshData, ModelData, Node } from "./types";
import { processMeshesForModel } from "./utils";

export const MontageStoreActions = (store: any) => ({
  setPlaneRef(ref: THREE.Mesh) {
    store.planeRef = ref;
  },

  toggle3D(is3D: boolean) {
    store.is3D = is3D;
    store.selectedModelId = null;
    store.selectedModelCorners = [];
    store.processMeshesForAllModels();
  },

  loadModel(id: string, path: string, position: THREE.Vector3) {
    const existingModel = store.models.find(
      (model: ModelData) => model.id === id
    );

    if (!existingModel) {
      store.models.push({
        id,
        path,
        position,
        meshes: [],
        nodes: [],
        rotation: new THREE.Euler(0, 0, 0),
        isLocked: false,
        scale: [1, 1, 1],
      });
    }
  },

  updateModelRotation(modelId: string, rotation: THREE.Euler | number[]) {
    const model = store.models.find((m: ModelData) => m.id === modelId);
    if (model) {
      if (Array.isArray(rotation)) {
        model.rotation = rotation;
      } else {
        model.rotation = [rotation.x, rotation.y, rotation.z];
      }

      const modelCenter = new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );

      model.nodes.forEach((node) => {
        if (!node.originalCenter) {
          node.originalCenter = {
            x: node.center.x,
            y: node.center.y,
            z: node.center.z,
          };
          node.originalOffset = new THREE.Vector3(
            node.center.x - modelCenter.x,
            node.center.y - modelCenter.y,
            node.center.z - modelCenter.z
          );
        }

        const nodeLocalOriginal = new THREE.Vector3(
          node.originalOffset.x,
          node.originalOffset.y,
          node.originalOffset.z
        );

        const rotationMatrix = new THREE.Matrix4();
        const eulerRotation = Array.isArray(model.rotation)
          ? new THREE.Euler(
              model.rotation[0],
              model.rotation[1],
              model.rotation[2]
            )
          : model.rotation;
        rotationMatrix.makeRotationFromEuler(eulerRotation);

        const nodeLocalRotated = nodeLocalOriginal
          .clone()
          .applyMatrix4(rotationMatrix);

        node.center.set(
          modelCenter.x + nodeLocalRotated.x,
          modelCenter.y + nodeLocalRotated.y,
          modelCenter.z + nodeLocalRotated.z
        );
      });
    }
  },
  handleDrag(point: THREE.Vector3) {
    if (store.isDragging && store.selectedModelId && point && store.is3D) {
      const model = store.models.find(
        (m: ModelData) => m.id === store.selectedModelId
      );

      if (model && !model.isLocked) {
        const delta = new THREE.Vector3().subVectors(point, model.position);

        model.position.copy(point);

        model.nodes.forEach((node) => {
          node.center.add(delta);
        });

        const snappingThreshold = 4;
        let snapped = false;
        const modelNodes = model.nodes;

        for (let i = 0; i < store.models.length && !snapped; i++) {
          const otherModel = store.models[i];
          if (otherModel.id === model.id) continue;
          const otherModelNodes = otherModel.nodes;

          for (let j = 0; j < otherModelNodes.length && !snapped; j++) {
            const otherNode = otherModelNodes[j];
            for (let k = 0; k < modelNodes.length && !snapped; k++) {
              const node = modelNodes[k];

              if (node.dominantAxis === otherNode.dominantAxis) {
                const distance = node.center.distanceTo(otherNode.center);

                if (distance <= snappingThreshold) {
                  const offset = new THREE.Vector3().subVectors(
                    otherNode.center,
                    node.center
                  );

                  model.position.add(offset);

                  modelNodes.forEach((node) => {
                    node.center.add(offset);
                  });

                  snapped = true;
                  break;
                }
              }
            }
          }
        }
      }
    }
  },

  storeMeshesForModel(id: string, meshes: MeshData[]) {
    const model = store.models.find((model: ModelData) => model.id === id);

    if (model) {
      model.meshes = meshes;
      if (!model.processed) {
        processMeshesForModel(model, store.is3D);
        model.processed = true;
      }
    }
  },

  storeNodesForModel(id: string, nodes: Node[]) {
    const model = store.models.find((model: ModelData) => model.id === id);
    if (model) {
      model.nodes = nodes;
    }
  },

  processMeshesForAllModels() {
    store.models.forEach((model: ModelData) => {
      processMeshesForModel(model, store.is3D);
    });
  },

  startDragging(modelGroup: THREE.Group) {
    if (modelGroup && modelGroup.parent) {
      const modelId = modelGroup.parent.name || store.selectedModelId;
      if (modelId) {
        store.selectModel(modelId);
        store.isDragging = true;
      }
    }
  },

  stopDragging() {
    store.isDragging = false;
  },

  setModelBoundingBox(id: string, boundingBox: THREE.Box3) {
    const model = store.models.find((model: ModelData) => model.id === id);
    if (model) {
      model.boundingBox = boundingBox;

      if (store.selectedModelId === id) {
        store.updateSelectedModelCorners(boundingBox);
      }
    }
  },

  updateSelectedModelCorners(boundingBox: THREE.Box3) {
    store.selectedModelCorners = [
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.min.z),
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.min.z),
    ];
  },

  selectModel(id: string) {
    const model = store.models.find((model: ModelData) => model.id === id);

    if (!model) {
      console.warn("Model not found:", id);
      return;
    }
    if (store.selectedModelId) {
      const previousModel = store.models.find(
        (model: ModelData) => model.id === store.selectedModelId
      );
      if (previousModel) {
        previousModel.showControls = false;
      }
    }
    store.selectedModelId = id;

    if (model.boundingBox) {
      store.updateSelectedModelCorners(model.boundingBox);
    } else {
      store.selectedModelCorners = [];
    }

    model.showControls = true;
  },

  deleteModel(id: string) {
    const modelIndex = store.models.findIndex(
      (model: ModelData) => model.id === id
    );

    if (modelIndex === -1) {
      console.warn("Model not found for deletion:", id);
      return;
    }

    if (store.selectedModelId === id) {
      store.selectedModelId = null;
      store.selectedModelCorners = [];
    }

    store.models.splice(modelIndex, 1);

    console.log(`Model ${id} deleted successfully`);
  },

  toggleShowControls(modelId: string, value: boolean) {
    const model = store.models.find((model: ModelData) => model.id === modelId);
    if (model) {
      model.showControls = value;
    }
  },

  duplicateModel(modelId: string) {
    const model = store.models.find((model: ModelData) => model.id === modelId);
    if (model) {
      const newModelId = `${model.id}-${Date.now()}-copy`;
      const offset = new THREE.Vector3(6, 0, -5);
      const newPosition = model.position.clone().add(offset);

      const newModel = {
        ...model,
        id: newModelId,
        position: newPosition,
        isLocked: false,
        nodes: model.nodes.map((node: Node) => {
          const nodeOffset = new THREE.Vector3().subVectors(
            node.center,
            model.position
          );

          const newCenter = newPosition.clone().add(nodeOffset);

          return {
            ...node,
            center: newCenter,
            originalCenter: node.originalCenter
              ? {
                  x: newPosition.x + nodeOffset.x,
                  y: newPosition.y + nodeOffset.y,
                  z: newPosition.z + nodeOffset.z,
                }
              : undefined,
          };
        }),
        meshes: [...model.meshes],
        showControls: false,
        boundingBox: model.boundingBox ? model.boundingBox.clone() : undefined,
      };

      store.models.push(newModel);

      store.selectModel(newModelId);
    }
  },

  toggleLockModel(modelId: string) {
    const model = store.models.find((model: ModelData) => model.id === modelId);
    if (model) {
      model.isLocked = !model.isLocked;
    }
  },

  updateTextureForModel(texture: THREE.Texture, nameOfAppliedTexture: string) {
    const model = store.models.find(
      (model: ModelData) => model.id === store.selectedModelId
    );

    if (model) {
      texture.needsUpdate = true;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      let textureApplied = false;

      model.meshes.forEach((mesh: MeshData) => {
        if (mesh.name.includes(nameOfAppliedTexture)) {
          if (!mesh.originalMaterial) {
            mesh.originalMaterial = mesh.material.clone();
          }

          const newMaterial = mesh.originalMaterial.clone();
          newMaterial.map = texture;
          newMaterial.needsUpdate = true;

          mesh.material = newMaterial;
          mesh.textureApplied = true;
          textureApplied = true;

          console.log(`Applied texture to ${mesh.name}`);
        }
      });

      if (!textureApplied) {
        console.warn(`No meshes found matching "${nameOfAppliedTexture}"`);
      }
    } else {
      console.warn("No model selected for texture update");
    }
  },
});
