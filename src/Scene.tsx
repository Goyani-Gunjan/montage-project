import {
  Edges,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const Scene = ({ is3D }) => {
  const { scene: modelScene } = useGLTF("/Dwelling_tag.glb");
  const clonedScene = useMemo(() => modelScene.clone(), [modelScene]);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const dragPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const dragStartPoint = useRef(new THREE.Vector3());
  const dragOffset = useRef(new THREE.Vector3());

  const { camera, raycaster, mouse, gl } = useThree();

  useEffect(() => {
    raycaster.setFromCamera(mouse, camera);
  }, [raycaster, mouse, camera]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.button !== 0) return;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(groupRef.current, true);
      if (intersects.length > 0) {
        setIsDragging(true);
        gl.domElement.style.cursor = "grabbing";

        if (is3D) {
          dragPlaneRef.current.normal.copy(
            camera.getWorldDirection(new THREE.Vector3())
          );
          const pos = groupRef.current.position.clone();
          dragPlaneRef.current.constant = -pos.dot(dragPlaneRef.current.normal);
        } else {
          dragPlaneRef.current.normal.set(0, 1, 0);
          dragPlaneRef.current.constant = 0;
        }

        raycaster.ray.intersectPlane(
          dragPlaneRef.current,
          dragStartPoint.current
        );

        dragOffset.current
          .copy(dragStartPoint.current)
          .sub(groupRef.current.position);
      }
    };

    const handlePointerMove = () => {
      if (isDragging) {
        raycaster.setFromCamera(mouse, camera);

        const intersectionPoint = new THREE.Vector3();
        if (
          raycaster.ray.intersectPlane(dragPlaneRef.current, intersectionPoint)
        ) {
          groupRef.current.position
            .copy(intersectionPoint)
            .sub(dragOffset.current);
        }
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        gl.domElement.style.cursor = "auto";
      }
    };

    const handlePointerLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        gl.domElement.style.cursor = "auto";
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isDragging, mouse, camera, raycaster, is3D, gl]);

  useFrame(() => {
    if (!isDragging) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(groupRef.current, true);
      gl.domElement.style.cursor = intersects.length > 0 ? "grab" : "auto";
    }
  });

  const processedScene = useMemo(() => {
    if (is3D) {
      clonedScene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.name.includes("Node")) {
            child.material = child.material.clone();
            child.material.color.set("cyan");
          }
          if (child.name.includes("Roof")) {
            child.visible = false;
          }
        }
      });
      return clonedScene;
    }

    const meshes = [];
    clonedScene.updateMatrixWorld(true);
    const parentInverseMatrix = new THREE.Matrix4()
      .copy(clonedScene.matrixWorld)
      .invert();

    clonedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        if (child.name.includes("Roof")) {
          child.material = null;
          child.visible = false;
          return;
        }

        if (child.name.includes("Node")) {
          child.material = child.material.clone();
          child.material.color.set("cyan");
        }

        child.updateMatrixWorld(true);
        const relativeMatrix = new THREE.Matrix4().multiplyMatrices(
          parentInverseMatrix,
          child.matrixWorld
        );
        if (child.name.includes("Node")) {
          meshes.push({
            geometry: child.geometry,
            matrix: relativeMatrix,
            material: child.material,
          });
        } else {
          meshes.push({
            geometry: child.geometry,
            matrix: relativeMatrix,
          });
        }
      }
    });

    return meshes;
  }, [clonedScene, is3D]);

  const handleMeshClick = (meshData, event) => {
    if (is3D || isDragging) return;

    const tempMesh = new THREE.Mesh(meshData.geometry, meshData.material);
    tempMesh.applyMatrix4(meshData.matrix);

    const boundingBox = new THREE.Box3().setFromObject(tempMesh);

    const localCorners = [
      new THREE.Vector3(
        boundingBox.min.x - 0.05,
        boundingBox.max.y,
        boundingBox.max.z + 0.05
      ),
      new THREE.Vector3(
        boundingBox.max.x + 0.05,
        boundingBox.max.y,
        boundingBox.max.z + 0.05
      ),
      new THREE.Vector3(
        boundingBox.max.x + 0.05,
        boundingBox.min.y,
        boundingBox.min.z - 0.05
      ),
      new THREE.Vector3(
        boundingBox.min.x - 0.05,
        boundingBox.min.y,
        boundingBox.min.z - 0.05
      ),
    ];

    setSelectedMesh(localCorners);
    event.stopPropagation();
  };

  const lines = useMemo(() => {
    if (!selectedMesh) return null;

    const points = [
      selectedMesh[0],
      selectedMesh[1],
      selectedMesh[1],
      selectedMesh[2],
      selectedMesh[2],
      selectedMesh[3],
      selectedMesh[3],
      selectedMesh[0],
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "red",
      linewidth: 3,
    });

    return { geometry, material };
  }, [selectedMesh]);

  return (
    <>
      <OrthographicCamera
        makeDefault={!is3D}
        position={[0, 5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        zoom={100}
      />
      <PerspectiveCamera makeDefault={is3D} fov={75} position={[0, 5, 5]} />
      <OrbitControls enableRotate={is3D} enabled={!isDragging} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <group ref={groupRef}>
        {Array.isArray(processedScene) ? (
          processedScene.map((meshData, index) => (
            <mesh
              key={index}
              geometry={meshData.geometry}
              material={meshData.material}
              matrixAutoUpdate={false}
              onClick={(event) => handleMeshClick(meshData, event)}
            >
              <primitive object={meshData.matrix} attach="matrix" />
              <Edges color="black" threshold={15} />
            </mesh>
          ))
        ) : (
          <primitive object={processedScene} />
        )}

        {selectedMesh &&
          selectedMesh.map((corner, index) => (
            <mesh key={index} position={corner}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>
          ))}

        {lines && (
          <line>
            <primitive object={lines.geometry} attach="geometry" />
            <primitive object={lines.material} attach="material" />
          </line>
        )}
      </group>
    </>
  );
};

export default Scene;
