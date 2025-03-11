import React, { useRef, useCallback, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Manager from "./store/Manager";

interface InvisiblePlaneProps {
  ref: React.Ref<THREE.Mesh>;
}

const InvisiblePlane = React.forwardRef<THREE.Mesh, InvisiblePlaneProps>(
  (_, ref) => {
    return (
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    );
  }
);

const CanvasWithDrop: React.FC = () => {
  const { gl, camera } = useThree();
  const manager = new Manager();
  const planeRef = useRef<THREE.Mesh>(null);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (planeRef.current) {
        const intersects = raycaster.intersectObject(planeRef.current);

        if (intersects.length > 0) {
          const point = intersects[0].point;

          try {
            const fileData = event.dataTransfer.getData("application/json");
            const file = JSON.parse(fileData);

            manager.montageStore.loadModel(file.path, point);
          } catch (err) {
            console.error("Error parsing dropped data:", err);
          }
        }
      }
    },
    [camera, gl, manager, raycaster, mouse]
  );

  const DragDropHandler = useCallback(() => {
    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    useEffect(() => {
      const canvas = gl.domElement;

      canvas.addEventListener("dragover", handleDragOver);
      canvas.addEventListener("drop", handleDrop);

      return () => {
        canvas.removeEventListener("dragover", handleDragOver);
        canvas.removeEventListener("drop", handleDrop);
      };
    }, [gl, handleDrop]);

    return null;
  }, [gl, handleDrop]);

  return (
    <>
      <InvisiblePlane ref={planeRef} />
      <DragDropHandler />
    </>
  );
};

export default CanvasWithDrop;
