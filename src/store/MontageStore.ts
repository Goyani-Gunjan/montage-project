import { makeAutoObservable, toJS } from "mobx";
import * as THREE from "three";
import Manager from "./Manager";
import { MeshData, ModelData, Module } from "./types";
import { MontageStoreActions } from "./actions";
import { fetchGet } from "../utils/FetchApi";
import Cookies from "js-cookie";
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
  async loadDesign(data: any) {
    const moduleArr = data.moduleArr;

    const token: string = Cookies.get("token");

    const response = await fetchGet<Module[]>("/modules", token);

    if (response.success && Array.isArray(response.data)) {
      const modules = response.data;

      const moduleMap = new Map<number, Module>();
      modules.forEach((module: Module) => {
        moduleMap.set(module.id, module);
      });

      moduleArr.forEach((moduleData: any) => {
        const moduleId = moduleData.moduleId;
        if (moduleMap.has(moduleId)) {
          const apiModule = moduleMap.get(moduleId)!;
          this.manager?.uiStore.addSelectedModule(apiModule);
          const newModel = {
            id: Date.now().toString(),
            path: apiModule.glbFile,
            position: new THREE.Vector3(
              moduleData.position[0],
              moduleData.position[1],
              moduleData.position[2]
            ),
            meshes: [],
            nodes: [],
            rotation: moduleData.rotate,
            isLocked: false,
            scale: moduleData.scale,
          };
          // console.log(newModel);
          this.models.push(newModel);
        } else {
          console.warn(`Module with ID ${moduleId} not found in API response.`);
        }
      });
    }
  }
}

export default MontageStore;
