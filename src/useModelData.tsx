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

    const modelSize = new THREE.Vector3();
    modelBox.getSize(modelSize);

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

        if (child.name.includes("Node")) {
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

          const perpendicularAxis = primaryAxis === "x" ? "z" : "x";
          const boundaryCenter = new THREE.Vector3().copy(nodeCenter);
          if (perpendicularAxis === "x") {
            boundaryCenter.x =
              nodeCenter.x > 0 ? modelSize.x / 2 : -modelSize.x / 2;
          } else {
            boundaryCenter.z =
              nodeCenter.z > 0 ? modelSize.z / 2 : -modelSize.z / 2;
          }

          const directionVector =
            primaryAxis === "x"
              ? new THREE.Vector3(1, 0, 0)
              : new THREE.Vector3(0, 0, 1);
          const halfLength =
            primaryAxis === "x" ? nodeSize.x / 2 : nodeSize.z / 2;

          const startPoint = new THREE.Vector3();
          const endPoint = new THREE.Vector3();
          startPoint
            .copy(boundaryCenter)
            .sub(directionVector.clone().multiplyScalar(halfLength));
          endPoint
            .copy(boundaryCenter)
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
            center: boundaryCenter.add(position),
            dominantAxis: primaryAxis,
            modelToNode: {
              x: nodeCenter.x - modelCenter.x,
              y: nodeCenter.y - modelCenter.y,
              z: nodeCenter.z - modelCenter.z,
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

export default useModelData;
