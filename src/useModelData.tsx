// useModelData.js
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import Manager from "./store/Manager";
import * as THREE from "three";
export const useModelData = (id, path, position) => {
  const manager = new Manager();

  const { scene } = useGLTF(path);

  const modelData = manager.montageStore.models.find(
    (model) => model.id === id
  );
  if (!modelData) {
    manager.montageStore.loadModel(path, id, position);
  }

  const tempMeshes = useMemo(() => {
    if (!scene) return [];

    const meshesArray = [];
    const clonedScene = scene.clone();
    clonedScene.updateMatrixWorld(true);

    const parentInverseMatrix = new THREE.Matrix4()
      .copy(clonedScene.matrixWorld)
      .invert();

    clonedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.updateMatrixWorld(true);
        const relativeMatrix = new THREE.Matrix4().multiplyMatrices(
          parentInverseMatrix,
          child.matrixWorld
        );

        const meshData = {
          id: `${child.name}_${Date.now()}`,
          name: child.name,
          geometry: child.geometry,
          material: child.material,
          matrix: relativeMatrix,
          position: child.position.clone(),
          rotation: child.rotation.clone(),
          scale: child.scale.clone(),
          visible: child.visible,
          processed: false,
        };

        meshesArray.push(meshData);
      }
    });

    const modelData = manager.montageStore.models.find((m) => m.id === id);
    if (!modelData || modelData.meshes.length === 0) {
      manager.montageStore.storeMeshesForModel(id, meshesArray);
    }

    return meshesArray;
  }, [scene, id]);

  return tempMeshes;
};
