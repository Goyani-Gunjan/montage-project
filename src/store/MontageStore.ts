import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { ModelData, MeshData } from "./types";
import { MontageStoreActions } from "./actions";
import Manager from "./Manager";

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

    Object.assign(this, MontageStoreActions(this));
  }

  getMeshesByModelId(id: string): MeshData[] {
    const model = this.models.find((model) => model.id === id);
    return model ? model.meshes : [];
  }
}

export default MontageStore;
