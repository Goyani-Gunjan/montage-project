// Model.js
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useMemo, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import * as THREE from "three";
import { useModelData } from "../../hooks/useModelData";
import { useModelInteraction } from "../../hooks/useModelInteraction";
import Manager from "../../store/Manager";
import { performRaycastFromMouse } from "../../utils/utils";
import BoundingBox from "./helper/BoundingBox";
import HoverEffects from "./helper/HoverEffects";
import HtmlList from "./helper/HtmlList";
import ModelRenderer from "./helper/ModelRenderer";

const Model = observer(({ id, path, position }) => {
  const manager = new Manager();
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const tempMeshes = useModelData(id, path, position);
  const { onMove, onDown, onUp } = useModelInteraction(id);

  const model = manager.montageStore.models.find((m) => m.id === id);
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
  }, [meshes, id]);

  const handleClick = (e: React.PointerEvent) => {
    e.stopPropagation();
    manager.montageStore.selectModel(id);
    manager.montageStore.toggleShowControls(id, true);
  };

  const handlePointerOver = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const { camera, gl } = useThree();

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (groupRef.current) {
      groupRef.current.name = id;
    }
    manager.montageStore.startDragging(groupRef.current);
    manager.montageStore.selectModel(id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (
      manager.montageStore.isDragging &&
      manager.montageStore.selectedModelId === id
    ) {
      const hit = performRaycastFromMouse(
        e,
        camera,
        gl,
        manager.montageStore.planeRef
      );
      if (hit) {
        manager.montageStore.handleDrag(hit);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    manager.montageStore.stopDragging();
  };

  return (
    <>
      <group
        position={[
          model?.position.x || 0,
          model?.position.y || 0,
          model?.position.z || 0,
        ]}
        scale={model?.scale}
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        rotation={model?.rotation}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <ModelRenderer meshes={meshes} manager={manager} />
        {!manager.montageStore.is3D && (
          <>
            <BoundingBox
              boundingBox={boundingBox}
              isSelected={manager.montageStore.selectedModelId === id}
              cornerSpheres={
                manager.montageStore.selectedModelId === id
                  ? manager.montageStore.selectedModelCorners
                  : []
              }
              onDown={onDown}
              onMove={onMove}
              onUp={onUp}
            />
            <HoverEffects boundingBox={boundingBox} isHovered={isHovered} />
          </>
        )}
        {model?.showControls && <HtmlList modelId={id} />}
        {model?.isLocked && (
          <Html>
            <div
              style={{
                color: "black",
                fontSize: "24px",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            >
              <FaLock />
            </div>
          </Html>
        )}
      </group>

      {!manager.montageStore.is3D &&
        model?.nodes.map((node, index) => (
          <mesh position={[node.center.x, 4, node.center.z]} key={index}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
        ))}
    </>
  );
});

export default Model;
