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
    manager.montageStore.loadModel(id, path, position);
  }

  const tempMeshes = useMemo(() => {
    if (!scene) return [];

    const meshesArray = [];
    const nodesArray = [];
    const clonedScene = scene.clone();
    clonedScene.updateMatrixWorld(true);

    const modelBox = new THREE.Box3().setFromObject(clonedScene);
    const modelCenter = new THREE.Vector3();
    modelBox.getCenter(modelCenter);

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
          position: child.position,
          rotation: child.rotation,
          scale: child.scale,
          visible: child.visible,
          processed: false,
        };

        if (child.name.toLowerCase().includes("node")) {
          const nodeGeometry = child.geometry.clone();
          nodeGeometry.applyMatrix4(child.matrixWorld);
          const nodeBox = new THREE.Box3().setFromBufferAttribute(
            nodeGeometry.attributes.position
          );

          const nodeSize = new THREE.Vector3();
          nodeBox.getSize(nodeSize);
          const primaryAxis = nodeSize.x > nodeSize.z ? "x" : "z";

          const nodeCenter = new THREE.Vector3();
          nodeBox.getCenter(nodeCenter);

          const modelToNodeVector = new THREE.Vector3().subVectors(
            nodeCenter,
            modelCenter
          );

          let startPoint = new THREE.Vector3();
          let endPoint = new THREE.Vector3();

          const directionVector = new THREE.Vector3();
          if (primaryAxis === "x") {
            directionVector.set(1, 0, 0);
          } else {
            directionVector.set(0, 0, 1);
          }

          directionVector.applyQuaternion(
            child.getWorldQuaternion(new THREE.Quaternion())
          );

          directionVector.normalize();

          const halfLength =
            primaryAxis === "x" ? nodeSize.x / 2 : nodeSize.z / 2;

          startPoint
            .copy(nodeCenter)
            .sub(directionVector.clone().multiplyScalar(halfLength));
          endPoint
            .copy(nodeCenter)
            .add(directionVector.clone().multiplyScalar(halfLength));
          nodesArray.push({
            id: meshData.id,
            name: child.name,
            startPoint: {
              x: startPoint.x,
              y: startPoint.y,
              z: startPoint.z,
            },
            endPoint: {
              x: endPoint.x,
              y: endPoint.y,
              z: endPoint.z,
            },
            center: nodeCenter.add(position),
            dominantAxis: primaryAxis,
            modelToNode: {
              x: modelToNodeVector.x,
              y: modelToNodeVector.y,
              z: modelToNodeVector.z,
            },
          });
        }

        meshesArray.push(meshData);
      }
    });

    const modelData = manager.montageStore.models.find((m) => m.id === id);
    if (!modelData || modelData.meshes.length === 0) {
      manager.montageStore.storeMeshesForModel(id, meshesArray);

      if (nodesArray.length > 0) {
        manager.montageStore.storeNodesForModel(id, nodesArray);
      }
    }

    return meshesArray;
  }, [scene, id]);

  return tempMeshes;
};
