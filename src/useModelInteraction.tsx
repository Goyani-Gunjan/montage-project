// useModelInteraction.js
import { useCallback, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import Manager from "./store/Manager";
import { findNearestAngle, performRaycastFromMouse } from "./utils/utils";
export const useModelInteraction = (id) => {
  const manager = new Manager();
  const { camera, gl } = useThree();
  const dragData = useRef({});

  const onMove = useCallback(
    (e: React.PointerEvent, i: number) => {
      e.stopPropagation();

      const model = manager.montageStore.models.find((m) => m.id === id);
      if (!model) return;

      const data = dragData.current[i];
      if (!data) return;

      const hit = performRaycastFromMouse(
        e,
        camera,
        gl,
        manager.montageStore.planeRef
      );
      if (!hit) return;

      const pointer = hit.clone();

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
    [id, camera, gl]
  );

  const onDown = useCallback(
    (e: React.PointerEvent, i: number) => {
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);

      const model = manager.montageStore.models.find((m) => m.id === id);
      if (!model) return;

      const center = new THREE.Vector3(...model.position);
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
    [id, camera, gl]
  );

  const onUp = useCallback(
    (e: React.PointerEvent, i: number) => {
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

      gsap.to(temp, {
        rot: curRot + delta,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          manager.montageStore.updateModelRotation(id, [0, -temp.rot, 0]);
        },
        onComplete: () => {
          manager.montageStore.updateModelRotation(id, [0, -targetRad, 0]);
        },
        id: "modelRotation",
      });

      delete dragData.current[i];
    },
    [id]
  );

  return { onMove, onDown, onUp };
};
