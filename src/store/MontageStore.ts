import { makeAutoObservable, action } from "mobx";
import Manager from "./Manager";
import * as THREE from "three";

interface MeshData {
  id: string;
  name: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  matrix: THREE.Matrix4;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  visible: boolean;
  processed?: boolean;
}

interface ModelData {
  id: string;
  path: string;
  position: THREE.Vector3;
  meshes: MeshData[];
  processed?: boolean;
  boundingBox?: THREE.Box3;
  rotation: THREE.Euler;

}

class MontageStore {
  manager: Manager | null = null;
  is3D: boolean = false;
  models: ModelData[] = [];
  selectedModelCorners: THREE.Vector3[] = [];
  selectedModelId: string | null = null;
  planeRef: THREE.Mesh | null = null; 
  isDragging: boolean | null = null;


  constructor(libState: Manager) {
    this.manager = libState;
    makeAutoObservable(this);
  }

  setPlaneRef = action((ref: THREE.Mesh) => {
    this.planeRef = ref;
  });

  toggle3D = action(() => {
    this.is3D = !this.is3D;
    this.selectedModelId = null; 
    this.selectedModelCorners = [];
    this.processMeshesForAllModels();
  });


  loadModel(id: string, path: string, position: THREE.Vector3) {
    const existingModel = this.models.find((model) => model.id === id);

    if (!existingModel) {
      this.models.push({ id, path, position, meshes: [], rotation: new THREE.Euler(0, 0, 0) });
    }
  }
  updateModelRotation(modelId: string, rotation: THREE.Euler) {
    const model = this.models.find(m => m.id === modelId);
    if (model) {
      model.rotation = rotation;
    }
  }
  storeMeshesForModel(id: string, meshes: MeshData[]) {
    const model = this.models.find((model) => model.id === id);

    if (model) {
      model.meshes = meshes;
      if (!model.processed) {
        this.processMeshesForModel(model);
        model.processed = true;
      }
    }
  };

  processMeshesForAllModels = action(() => {
    this.models.forEach((model) => {
      this.processMeshesForModel(model);
    });
  });

handleDrag = action((point : THREE.Vector3) => {
  if (this.isDragging && this.selectedModelId && point) {
    const model = this.models.find(m => m.id === this.selectedModelId);
    if (model) {
      model.position = new THREE.Vector3(point.x, point.y, point.z);
    }
  }
});

startDragging = action((modelGroup : THREE.Group) => {
  if (modelGroup && modelGroup.parent) {
    const modelId = modelGroup.parent.name || this.selectedModelId;
    if (modelId) {
      this.selectModel(modelId);
      this.isDragging = true;
    }
  }
});


  stopDragging() {
    this.isDragging = false;
  }

  processMeshesForModel = action((model: ModelData) => {
    model.meshes.forEach((mesh) => {
      if (mesh) {
        if (this.is3D) {
          if (mesh.name.includes("Node")) {
            if (!mesh.processed) {
              mesh.material = mesh.material.clone();
              mesh.processed = true;
            }
            mesh.material.color.set("cyan");
            mesh.visible = true;
          }
          else {
            mesh.visible = true;
          }
        } else {
          if (mesh.name.includes("Node")) {
            if (!mesh.processed) {
              mesh.material = mesh.material.clone();
              mesh.material.color.set("cyan");
              mesh.processed = true;
            }
            mesh.visible = true;
          }
          if (mesh.name.includes("Roof")) {
            if (!mesh.processed) {
              mesh.material = mesh.material.clone();
              mesh.processed = true;
            }
            mesh.visible = false;
          }
          if (mesh.name.includes("Floor")) {
            if (!mesh.processed) {
              mesh.material = mesh.material.clone();
              mesh.material.color.set("#ffffff");
              mesh.material.emissive.set("#444444");
              mesh.material.metalness = 0;
              mesh.material.roughness = 0.5;
              mesh.processed = true;
            }
            mesh.visible = true;
          }
        }
      }
    });
  });

  setModelBoundingBox = action((id: string, boundingBox: THREE.Box3) => {
    const model = this.models.find((model) => model.id === id);
    if (model) {
      model.boundingBox = boundingBox;

      if (this.selectedModelId === id) {
        this.updateSelectedModelCorners(boundingBox);
      }
    }
  });

  updateSelectedModelCorners = action((boundingBox: THREE.Box3) => {
    this.selectedModelCorners = [
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.min.z),
      new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.max.z),
      new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.min.z),
    ];
  });

  selectModel = action((id: string) => {
    const model = this.models.find((model) => model.id === id);

    if (!model) {
      console.warn("Model not found:", id);
      return;
    }

    this.selectedModelId = id;

    if (model.boundingBox) {
      this.updateSelectedModelCorners(model.boundingBox);
    } else {
      this.selectedModelCorners = [];
    }
  });

  deleteModel = action((id: string) => {
    const modelIndex = this.models.findIndex((model) => model.id === id);

    if (modelIndex === -1) {
      console.warn("Model not found for deletion:", id);
      return;
    }

    if (this.selectedModelId === id) {
      this.selectedModelId = null;
      this.selectedModelCorners = [];
    }

    this.models.splice(modelIndex, 1);

    console.log(`Model ${id} deleted successfully`);
  });

  getMeshesByModelId(id: string): MeshData[] {
    const model = this.models.find((model) => model.id === id);
    return model ? model.meshes : [];
  }
}

export default MontageStore;
