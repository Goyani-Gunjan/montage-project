import { observer } from "mobx-react";
import { Edges, Line, useGLTF } from "@react-three/drei";
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

  const cornerSpheres = manager.montageStore.selectedModelCorners;

  const handleClick = (e) => {
    manager.montageStore.handleModelClick(e.object);
  };

  return (
    <group position={position} onClick={handleClick}>
      {meshes.map((meshData) => {
        if (!manager.montageStore.is3D) {
          const isNode = meshData.name.includes("Node");
          const isFloor = meshData.name.includes("Floor");
          if (isNode) {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
                material={meshData.material}
              >
                <primitive
                  object={meshData.material.clone().color.set("cyan")}
                />
              </mesh>
            );
          }
          if (isFloor) {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
                material={meshData.material}
              >
                <primitive
                  object={meshData.material.clone().color.set("#f3f3f0")}
                />
              </mesh>
            );
          } else {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
              >
                <Edges color="black" />
              </mesh>
            );
          }
        }

        return (
          <mesh
            key={meshData.id}
            geometry={meshData.geometry}
            material={meshData.material}
            matrixAutoUpdate={false}
            matrix={meshData.matrix}
            visible={meshData.visible}
          />
        );
      })}

      {!manager.montageStore.is3D && (
        <>
          {cornerSpheres.map((corner, index) => (
            <mesh key={index} position={corner}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}

          {cornerSpheres.length === 4 && (
            <>
              <Line
                points={[cornerSpheres[0], cornerSpheres[1]]}
                color="red"
                lineWidth={2}
              />
              <Line
                points={[cornerSpheres[1], cornerSpheres[2]]}
                color="red"
                lineWidth={2}
              />
              <Line
                points={[cornerSpheres[2], cornerSpheres[3]]}
                color="red"
                lineWidth={2}
              />
              <Line
                points={[cornerSpheres[3], cornerSpheres[0]]}
                color="red"
                lineWidth={2}
              />
            </>
          )}
        </>
      )}
    </group>
  );
});

export default Model;
