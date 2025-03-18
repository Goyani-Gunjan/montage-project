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
  showControls: boolean = false; 
  constructor(libState: Manager) {
    this.manager = libState;
    makeAutoObservable(this);

    // Bind actions
    Object.assign(this, MontageStoreActions(this));
  }

  getMeshesByModelId(id: string): MeshData[] {
    const model = this.models.find((model) => model.id === id);
    return model ? model.meshes : [];
  }
  duplicateModel(modelId: string) {
    const model = this.models.find((model) => model.id === modelId);
    if (model) {
      const newModel = { ...model, id: `${model.id}-${Date.now()}-copy` };
      const offset = new THREE.Vector3(1, 0, 1); 
      newModel.position = model.position.clone().add(offset);
  
      this.models.push(newModel);
    }
  }
  toggleShowControls = (value: boolean) => {
    this.showControls = value;
  };
}

export default MontageStore;