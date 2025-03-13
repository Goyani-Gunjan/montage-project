import { observer } from "mobx-react";

import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import Manager from "./store/Manager";
import ModelRenderer from "./ModelRenderer";
import BoundingBox from "./BoundingBox";
import HoverEffects from "./HoverEffects";

import HtmlList from "./HtmlList";

const Model = observer(({ id, path, position, sharedManager }) => {
  // Use shared manager instance instead of creating a new one
  const manager = sharedManager || new Manager();
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [flipX, setFlipX] = useState(1);
  const [flipZ, setFlipZ] = useState(1);

  const modelData = manager.montageStore.models.find(
    (model) => model.id === id
  );

  if (!modelData) {
    manager.montageStore.loadModel(id, path, position);
  }

  const { scene } = useGLTF(path);

  useEffect(() => {
    setShowControls(manager.montageStore.selectedModelId === id);
  }, [manager.montageStore.selectedModelId, id]);

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
  }, [scene, id, modelData, manager.montageStore]);

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
  }, [meshes, id, manager.montageStore]);

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

  const handleFlipHorizontal = () => setFlipX((prev) => prev * -1);
  const handleFlipVertical = () => setFlipZ((prev) => prev * -1);

  return (
    <group
      position={position}
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={[flipX, 1, flipZ]}
    >
      <ModelRenderer meshes={meshes} manager={manager} />

      <BoundingBox
        boundingBox={boundingBox}
        isSelected={manager.montageStore.selectedModelId === id}
        cornerSpheres={
          manager.montageStore.selectedModelId === id
            ? manager.montageStore.selectedModelCorners
            : []
        }
      />

      <HoverEffects boundingBox={boundingBox} isHovered={isHovered} />

      {showControls && (
        <HtmlList
          onFlipHorizontal={handleFlipHorizontal}
          onFlipVertical={handleFlipVertical}
          modelId={id}
        />
      )}
    </group>
  );
});

export default Model;
