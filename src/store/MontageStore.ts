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
  path: string;
  position: THREE.Vector3;
  meshes: MeshData[];
  processed?: boolean; 
}

class MontageStore {
  manager: Manager | null = null;
  is3D: boolean = false;
  models: ModelData[] = [];

  constructor(libState: Manager) {
    this.manager = libState;
    makeAutoObservable(this);
  }

  toggle3D() {
    this.is3D = !this.is3D;
    this.processMeshesForAllModels();
  }

  loadModel(path: string, position: THREE.Vector3) {
    const existingModel = this.models.find((model) => model.path === path);
    if (!existingModel) {
      this.models.push({ path, position, meshes: [] });
    }
  }

  storeMeshesForModel(path: string, meshes: MeshData[]) {
    const model = this.models.find((model) => model.path === path);
    if (model) {
      model.meshes = meshes;
      if (!model.processed) {
        this.processMeshesForModel(model);
        model.processed = true;
      }
    }
  }

  processMeshesForAllModels = action(() => {
    this.models.forEach(model => {
      this.processMeshesForModel(model);
    });
  });

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
          } else {
            mesh.visible = true;
          }
        } else {
          if (mesh.name.includes("Node")) {
            if (!mesh.processed) {
              mesh.material = mesh.material.clone();
              mesh.material.color.set("cyan");
              mesh.processed = true;
            }
          }
          
        }
      }
    });
  });

  getMeshesByModelId(path: string): MeshData[] {
    const model = this.models.find((model) => model.path === path);
    return model ? model.meshes : [];
  }
}

export default MontageStore;