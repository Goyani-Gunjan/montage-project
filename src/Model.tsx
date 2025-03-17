import { observer } from "mobx-react";
import { useMemo, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Manager from "./store/Manager";
import ModelRenderer from "./ModelRenderer";
import BoundingBox from "./BoundingBox";
import HoverEffects from "./HoverEffects";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

const findNearestAngle = (deg: number): number => {
  const allowed = [0, 90, 180, 270];
  deg = ((deg % 360) + 360) % 360;
  return allowed.reduce((prev, curr) =>
    Math.abs(deg - curr) < Math.abs(deg - prev) ? curr : prev
  );
};

const performRaycastFromMouse = (e, camera, gl, plane) => {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const canvas = gl.domElement;
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  if (plane) {
    const intersects = raycaster.intersectObject(plane, true);
    if (intersects.length > 0) {
      return intersects[0].point; // Return the intersection point on the plane
    }
  }
  return null;
};

const Model = observer(({ id, path, position }) => {
  const manager = new Manager();
  const groupRef = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const dragData = useRef<
    Record<
      number,
      {
        initialPointer: THREE.Vector3;
        modelCenter: THREE.Vector3;
        initialRotation: number;
        latestAngleDiff: number;
      }
    >
  >({});

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

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      manager.montageStore.selectModel(id);
    },
    [id, manager]
  );

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const { camera, gl } = useThree();
  const onMove = useCallback(
    (e, i) => {
      e.stopPropagation();

      const model = manager.montageStore.models.find((m) => m.id === id);
      if (!model) return;

      const data = dragData.current[i];
      if (!data) return;

      // Adjusting the raycast to take model's position into account
      const hit = performRaycastFromMouse(
        e,
        camera,
        gl,
        manager.montageStore.planeRef
      );
      if (!hit) return;

      const pointer = hit.clone();

      // Adjusting vectors to account for model's position
      const iv = new THREE.Vector2(
        data.initialPointer.x - model.position.x,
        data.initialPointer.z - model.position.z
      );
      const cv = new THREE.Vector2(
        pointer.x - model.position.x,
        pointer.z - model.position.z
      );

      let diff = cv.angleTo(iv);
      if (iv.x * cv.y - iv.y * cv.x < 0) diff = -diff;
      data.latestAngleDiff = diff;

      const newRot = data.initialRotation + diff;
      manager.montageStore.updateModelRotation(id, [0, -newRot, 0]);
    },
    [id, manager]
  );

  const onDown = useCallback(
    (e, i) => {
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);

      const model = manager.montageStore.models.find((m) => m.id === id);
      if (!model) return;

      const center = new THREE.Vector3(...model.position); // Ensure this is model's position
      const hit = performRaycastFromMouse(
        e,
        camera,
        gl,
        manager.montageStore.planeRef
      );
      if (!hit) return;

      const pointer = hit.clone();

      let rotY = model.rotation?.[1] ?? 0;
      rotY = THREE.MathUtils.euclideanModulo(-rotY, Math.PI * 2);
      dragData.current[i] = {
        initialPointer: pointer,
        modelCenter: center,
        initialRotation: rotY,
        latestAngleDiff: 0,
      };
    },
    [id, manager]
  );

  const onUp = useCallback(
    (e, i) => {
      e.stopPropagation();
      e.target.releasePointerCapture(e.pointerId);

      const model = manager.montageStore.models.find((m) => m.id === id);
      if (!model) return;

      const data = dragData.current[i];
      if (!data) return;

      const curRot = data.initialRotation + data.latestAngleDiff;
      const targetDeg = findNearestAngle(THREE.MathUtils.radToDeg(curRot));
      const targetRad = THREE.MathUtils.degToRad(targetDeg);
      let delta = targetRad - curRot;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      const duration = Math.min(0.5, (Math.abs(delta) / Math.PI) * 0.8);
      const temp = { rot: curRot };

      // animating.current = true;
      gsap.to(temp, {
        rot: curRot + delta,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          manager.montageStore.updateModelRotation(id, [0, -temp.rot, 0]);
        },
        onComplete: () => {
          manager.montageStore.updateModelRotation(id, [0, -targetRad, 0]);
          // animating.current = false;
        },
        id: "modelRotation",
      });

      delete dragData.current[i];
    },
    [id, manager]
  );

  const handlePointerDown = (e) => {
    e.stopPropagation();
    manager.montageStore.startDragging(groupRef.current);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    manager.montageStore.stopDragging();
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (manager.montageStore.isDragging) {
      const hit = performRaycastFromMouse(
        e,
        camera,
        gl,
        manager.montageStore.planeRef
      );
      manager.montageStore.handleDrag(hit);
    }
  };

  return (
    <group
      position={model?.position}
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
      <BoundingBox
        boundingBox={boundingBox}
        isSelected={manager.montageStore.selectedModelId === id}
        cornerSpheres={manager.montageStore.selectedModelCorners}
        onDown={onDown}
        onMove={onMove}
        onUp={onUp}
      />
      <HoverEffects boundingBox={boundingBox} isHovered={isHovered} />
    </group>
  );
});

export default Model;
