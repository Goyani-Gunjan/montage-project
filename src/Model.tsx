import { observer } from "mobx-react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Manager from "./store/Manager";
import ModelRenderer from "./ModelRenderer";
import BoundingBox from "./BoundingBox";
import HoverEffects from "./HoverEffects";
import { useGLTF } from "@react-three/drei";

const Model = observer(({ id, path, position }) => {
  const manager = new Manager();
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const modelData = manager.montageStore.models.find(
    (model) => model.id === id
  );

  if (!modelData) {
    manager.montageStore.loadModel(path, id, position);
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
      manager.montageStore.storeMeshesForModel(id, meshesArray);
    }

    return meshesArray;
  }, [scene, id]);

  const model = manager.montageStore.models.find((m) => m.id === id);
  if (model) {
    manager.montageStore.processMeshesForModel(model);
  }

  const meshes = manager.montageStore.getMeshesByModelId(id);

  const boundingBox = useMemo(() => {
    if (meshes.length > 0) {
      const tempGroup = new THREE.Group();
      meshes.forEach((meshData) => {
        const tempMesh = new THREE.Mesh(meshData.geometry);
        tempMesh.applyMatrix4(meshData.matrix);
        tempGroup.add(tempMesh);
      });

      const boundingBox = new THREE.Box3().setFromObject(tempGroup);
      manager.montageStore.setModelBoundingBox(id, boundingBox);
      return boundingBox;
    }
    return null;
  }, [meshes, path]);

  const handleClick = (e) => {
    e.stopPropagation();
    manager.montageStore.selectModel(id);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <group
      position={position}
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <ModelRenderer meshes={meshes} manager={manager} />
      <BoundingBox
        boundingBox={boundingBox}
        isSelected={manager.montageStore.selectedModelPath === path}
        cornerSpheres={manager.montageStore.selectedModelCorners}
      />
      <HoverEffects boundingBox={boundingBox} isHovered={isHovered} />
    </group>
  );
});

export default Model;
