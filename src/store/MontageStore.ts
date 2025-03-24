/* eslint-disable @typescript-eslint/no-unused-vars */
import Manager from "./Manager";
import { ModelData, Module } from "./types";
import { MeshData } from "./types";
import { Node } from "./types";
import { makeAutoObservable } from "mobx";
import { MontageStoreActions } from "./actions";
import * as THREE from "three";
import { fetchGet } from "../utils/FetchApi";
import Cookies from "js-cookie";
interface MontageStoreActionMethods {
  setPlaneRef(ref: THREE.Mesh): void;
  toggle3D(is3D: boolean): void;
  loadModel(id: string, path: string, position: THREE.Vector3): void;
  updateModelRotation(modelId: string, rotation: THREE.Euler | number[]): void;
  handleDrag(point: THREE.Vector3): void;
  storeMeshesForModel(id: string, meshes: MeshData[]): void;
  storeNodesForModel(id: string, nodes: Node[]): void;
  processMeshesForAllModels(): void;
  startDragging(modelGroup: THREE.Group): void;
  stopDragging(): void;
  setModelBoundingBox(id: string, boundingBox: THREE.Box3): void;
  updateSelectedModelCorners(boundingBox: THREE.Box3): void;
  selectModel(id: string): void;
  deleteModel(id: string): void;
  toggleShowControls(modelId: string, value: boolean): void;
  duplicateModel(modelId: string): void;
  toggleLockModel(modelId: string): void;
  updateTextureForModel(texture: string): void;
}

class MontageStore implements MontageStoreActionMethods {
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

    const actions = MontageStoreActions(this);
    Object.assign(this, actions);
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

      const rotationMatrix = new THREE.Matrix4();
      const eulerRotation = Array.isArray(model.rotation)
        ? new THREE.Euler(
            model.rotation[0],
            model.rotation[1],
            model.rotation[2]
          )
        : model.rotation;
      rotationMatrix.makeRotationFromEuler(eulerRotation);

      model.nodes.forEach((node) => {
        const offset = new THREE.Vector3().subVectors(node.center, modelCenter);

        offset.applyMatrix4(rotationMatrix);

        offset.x *= -1;

        offset.applyMatrix4(rotationMatrix.clone().invert());

        node.center.copy(modelCenter).add(offset);

        if (node.dominantAxis === "x") {
          node.dominantAxis = "z";
        } else if (node.dominantAxis === "z") {
          node.dominantAxis = "x";
        }
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

      const rotationMatrix = new THREE.Matrix4();
      const eulerRotation = Array.isArray(model.rotation)
        ? new THREE.Euler(
            model.rotation[0],
            model.rotation[1],
            model.rotation[2]
          )
        : model.rotation;
      rotationMatrix.makeRotationFromEuler(eulerRotation);

      model.nodes.forEach((node) => {
        const offset = new THREE.Vector3().subVectors(node.center, modelCenter);

        offset.applyMatrix4(rotationMatrix);

        offset.z *= -1;

        offset.applyMatrix4(rotationMatrix.clone().invert());

        node.center.copy(modelCenter).add(offset);

        if (node.dominantAxis === "x") {
          node.dominantAxis = "z";
        } else if (node.dominantAxis === "z") {
          node.dominantAxis = "x";
        }
      });
    }
  }
  async loadDesign(data: any) {
    this.models = [];
    const moduleArr = data.moduleArr;

    const token: string | undefined = Cookies.get("token");

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
            rotation: [0, moduleData.rotation, 0],
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

  setPlaneRef(_ref: THREE.Mesh): void {}
  toggle3D(_is3D: boolean): void {}
  loadModel(_id: string, _path: string, _position: THREE.Vector3): void {}
  updateModelRotation(
    _modelId: string,
    _rotation: THREE.Euler | number[]
  ): void {}
  handleDrag(_point: THREE.Vector3): void {}
  storeMeshesForModel(_id: string, _meshes: MeshData[]): void {}
  storeNodesForModel(_id: string, _nodes: Node[]): void {}
  processMeshesForAllModels(): void {}
  startDragging(_modelGroup: THREE.Group | null): void {}
  stopDragging(): void {}
  setModelBoundingBox(_id: string, _boundingBox: THREE.Box3): void {}
  updateSelectedModelCorners(_boundingBox: THREE.Box3): void {}
  selectModel(_id: string): void {}
  deleteModel(_id: string): void {}
  toggleShowControls(_modelId: string, _value: boolean): void {}
  duplicateModel(_modelId: string): void {}
  toggleLockModel(_modelId: string): void {}
  updateTextureForModel(_texture: string): void {}
}

export default MontageStore;
