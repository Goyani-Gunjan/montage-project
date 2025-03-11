import { observer } from "mobx-react";
import { Edges, useGLTF } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import * as THREE from "three";
import Manager from "./store/Manager";

const Model = observer(({ path, position }) => {
  const manager = new Manager();

  const modelData = manager.montageStore.models.find(
    (model) => model.path === path
  );

  if (!modelData) {
    manager.montageStore.loadModel(path, position);
  }

  const { scene } = useGLTF(path);

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

    if (!modelData || modelData.meshes.length === 0) {
      manager.montageStore.storeMeshesForModel(path, meshesArray);
    }

    return meshesArray;
  }, [scene, path]);

  useEffect(() => {
    const model = manager.montageStore.models.find((m) => m.path === path);
    if (model) {
      manager.montageStore.processMeshesForModel(model);
    }
  }, [manager.montageStore.is3D, path]);

  const meshes = manager.montageStore.getMeshesByModelId(path);

  return (
    <group position={position}>
      {meshes.map((meshData) => (
        <mesh
          key={meshData.id}
          geometry={meshData.geometry}
          material={meshData.material}
          matrixAutoUpdate={false}
          matrix={meshData.matrix}
          visible={meshData.visible}
          onClick={() => {
            console.log(`Selected mesh with id: ${meshData.id}`);
          }}
        >
          <Edges color={"black"} />
        </mesh>
      ))}
    </group>
  );
});

export default Model;
