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
}

class MontageStore {
  manager: Manager | null = null;
  is3D: boolean = false;
  models: ModelData[] = [];
  selectedModelCorners: THREE.Vector3[] = [];
  selectedModelId: string | null = null;

  planeRef: THREE.Mesh | null = null;

  constructor(libState: Manager) {
    this.manager = libState;
    makeAutoObservable(this);
  }

  setPlaneRef = action((ref: THREE.Mesh) => {
    this.planeRef = ref;
  });

  toggle3D = action(() => {
    this.is3D = !this.is3D;
    this.processMeshesForAllModels();
  });

  loadModel = action((id: string, path: string, position: THREE.Vector3) => {
    if (!this.models.some((model) => model.id === id)) {
      this.models.push({ id, path, position, meshes: [] });
    }
  });

  storeMeshesForModel = action((id: string, meshes: MeshData[]) => {
    const model = this.models.find((model) => model.id === id);

    if (model) {
      model.meshes = meshes;
      if (!model.processed) {
        this.processMeshesForModel(model);
        model.processed = true;
      }
    }
  });

  processMeshesForAllModels = action(() => {
    this.models.forEach((model) => {
      this.processMeshesForModel(model);
    });
  });

  processMeshesForModel = action((model: ModelData) => {
    model.meshes.forEach((mesh) => {
      if (!mesh) return;

      // Common processing regardless of 3D state
      if (mesh.name.includes("Node") && !mesh.processed) {
        mesh.material = mesh.material.clone();
        mesh.material.color.set("cyan");
        mesh.processed = true;
        mesh.visible = true;
      }

      if (!this.is3D) {
        // 2D specific processing
        if (mesh.name.includes("Roof")) {
          if (!mesh.processed) {
            mesh.material = mesh.material.clone();
            mesh.processed = true;
          }
          mesh.visible = false;
        } else if (mesh.name.includes("Floor")) {
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
      } else {
        // 3D specific processing - make everything visible
        mesh.visible = true;
      }
    });
  });

  setModelBoundingBox = action((id: string, boundingBox: THREE.Box3) => {
    const model = this.models.find((model) => model.id === id);
    if (model) {
      model.boundingBox = boundingBox;

      // If this is the selected model, update the corners
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

  getMeshesByModelId(id: string): MeshData[] {
    const model = this.models.find((model) => model.id === id);
    return model ? model.meshes : [];
  }
}

export default MontageStore;
