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
  flipModelHorizontally(id: string) {
    const model = this.models.find((model) => model.id === id);
    if (model) {
      model.scale = [-model.scale[0], model.scale[1], model.scale[2]];

      const modelCenter = new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );

      model.nodes.forEach((node) => {
        const offset = new THREE.Vector3().subVectors(node.center, modelCenter);

        offset.x *= -1;

        node.center.copy(modelCenter).add(offset);
      });
    }
  }

  flipModelVertically(id: string) {
    const model = this.models.find((model) => model.id === id);
    if (model) {
      model.scale = [model.scale[0], model.scale[1], -model.scale[2]];

      const modelCenter = new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );

      model.nodes.forEach((node) => {
        const offset = new THREE.Vector3().subVectors(node.center, modelCenter);

        offset.z *= -1;

        node.center.copy(modelCenter).add(offset);
      });
    }
  }
}

export default MontageStore;
