import { observer } from "mobx-react";
import { Edges, Line, useGLTF } from "@react-three/drei";
import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import Manager from "./store/Manager";

const Model = observer(({ path, position }) => {
  const manager = new Manager();
  const groupRef = useRef();

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

  const model = manager.montageStore.models.find((m) => m.path === path);
  if (model) {
    manager.montageStore.processMeshesForModel(model);
  }

  const meshes = manager.montageStore.getMeshesByModelId(path);

  const cornerSpheres = manager.montageStore.selectedModelCorners;
  const isSelected = manager.montageStore.selectedModelPath === path;

  if (meshes.length > 0) {
    const boundingBox = new THREE.Box3();

    const tempGroup = new THREE.Group();

    meshes.forEach((meshData) => {
      const tempMesh = new THREE.Mesh(meshData.geometry);
      tempMesh.applyMatrix4(meshData.matrix);
      tempGroup.add(tempMesh);
    });

    boundingBox.setFromObject(tempGroup);

    manager.montageStore.setModelBoundingBox(path, boundingBox);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    manager.montageStore.selectModel(path);
  };

  return (
    <group position={position} ref={groupRef} onClick={handleClick}>
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

      {/* Render cornerSpheres only if this model is selected */}
      {!manager.montageStore.is3D &&
        isSelected &&
        cornerSpheres.length === 4 && (
          <>
            {cornerSpheres.map((corner, index) => (
              <mesh key={index} position={corner}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}

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
    </group>
  );
});

export default Model;
