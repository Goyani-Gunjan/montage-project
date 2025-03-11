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
  boundingBox?: THREE.Box3;
}

class MontageStore {
  manager: Manager | null = null;
  is3D: boolean = false;
  models: ModelData[] = [];
  selectedModelCorners: THREE.Vector3[] = [];
  selectedModelPath: string | null = null;

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
    this.models.forEach((model) => {
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

  // Store the bounding box for a model
  setModelBoundingBox = action((path: string, boundingBox: THREE.Box3) => {
    const model = this.models.find((model) => model.path === path);
    if (model) {
      model.boundingBox = boundingBox;
    }
  });

  // New method to select a model and update corner spheres
  selectModel = action((path: string) => {
    const model = this.models.find((model) => model.path === path);

    if (model && model.boundingBox) {
      const boundingBox = model.boundingBox;

      // Create corner points from the bounding box with fixed Y value (3.5)
      const worldCorners: THREE.Vector3[] = [
        new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.min.z),
        new THREE.Vector3(boundingBox.min.x, 3.5, boundingBox.max.z),
        new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.max.z),
        new THREE.Vector3(boundingBox.max.x, 3.5, boundingBox.min.z),
      ];

      this.selectedModelPath = path;
      this.selectedModelCorners = worldCorners;

      console.log("Model selected:", path);
      console.log("Corners:", worldCorners);
    } else {
      console.warn("Model not found or no bounding box available:", path);
    }
  });

  // For backward compatibility
  handleModelClick(object: THREE.Mesh, path: string) {
    this.selectModel(path);
  }

  setSelectedModelCorners(corners: THREE.Vector3[]) {
    this.selectedModelCorners = corners;
  }

  setSelectedModelPath(path: string | null) {
    this.selectedModelPath = path;
  }

  getMeshesByModelId(path: string): MeshData[] {
    const model = this.models.find((model) => model.path === path);
    return model ? model.meshes : [];
  }
}

export default MontageStore;
