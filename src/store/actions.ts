import { action } from "mobx";
import * as THREE from "three";
import { ModelData, MeshData } from "./types";
import { processMeshesForModel } from "./utils";

export const MontageStoreActions = (store: any) => ({
  setPlaneRef: action((ref: THREE.Mesh) => {
    store.planeRef = ref;
  }),

  toggle3D: action(() => {
    store.is3D = !store.is3D;
    store.selectedModelId = null;
    store.selectedModelCorners = [];
    store.processMeshesForAllModels();
  }),

  loadModel: action((id: string, path: string, position: THREE.Vector3) => {
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
      });
    }
  }),

  updateModelRotation: action((modelId: string, rotation: THREE.Euler) => {
    const model = store.models.find((m: ModelData) => m.id === modelId);
    if (model) {
      model.rotation = rotation;
    }
  }),

  storeMeshesForModel: action((id: string, meshes: MeshData[]) => {
    const model = store.models.find((model: ModelData) => model.id === id);

    if (model) {
      model.meshes = meshes;
      if (!model.processed) {
        processMeshesForModel(model, store.is3D);
        model.processed = true;
      }
    }
  }),

  storeNodesForModel: action((id: string, nodes: any[]) => {
    const model = store.models.find((model: ModelData) => model.id === id);
    if (model) {
      model.nodes = nodes;
    }
  }),

  processMeshesForAllModels: action(() => {
    store.models.forEach((model: ModelData) => {
      processMeshesForModel(model, store.is3D);
    });
  }),

  handleDrag: action((point: THREE.Vector3) => {
    if (store.isDragging && store.selectedModelId && point) {
      const model = store.models.find(
        (m: ModelData) => m.id === store.selectedModelId
      );

      if (model) {
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
  }),

  startDragging: action((modelGroup: THREE.Group) => {
    if (modelGroup && modelGroup.parent) {
      const modelId = modelGroup.parent.name || store.selectedModelId;
      if (modelId) {
        store.selectModel(modelId);
        store.isDragging = true;
      }
    }
  }),

  stopDragging: action(() => {
    store.isDragging = false;
  }),

  setModelBoundingBox: action((id: string, boundingBox: THREE.Box3) => {
    const model = store.models.find((model: ModelData) => model.id === id);
    if (model) {
      model.boundingBox = boundingBox;

      if (store.selectedModelId === id) {
        store.updateSelectedModelCorners(boundingBox);
      }
    }
  }),

  updateSelectedModelCorners: action((boundingBox: THREE.Box3) => {
    store.selectedModelCorners = [
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.min.z),
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.min.z),
    ];
  }),

  selectModel: action((id: string) => {
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
  }),

  deleteModel: action((id: string) => {
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
  }),

  toggleShowControls: action((modelId: string, value: boolean) => {
    const model = store.models.find((model: ModelData) => model.id === modelId);
    if (model) {
      model.showControls = value;
    }
  }),
});
