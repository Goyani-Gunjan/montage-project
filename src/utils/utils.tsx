// utils.js
import * as THREE from "three";
export const findNearestAngle = (deg: number): number => {
  const allowed = [0, 90, 180, 270];
  deg = ((deg % 360) + 360) % 360;
  return allowed.reduce((prev, curr) =>
    Math.abs(deg - curr) < Math.abs(deg - prev) ? curr : prev
  );
};

export const performRaycastFromMouse = (
  e = { clientX: 0, clientY: 0 },
  camera: THREE.Camera,
  gl: THREE.WebGLRenderer,
  plane: THREE.Mesh
) => {
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
      return intersects[0].point;
    }
  }
  return null;
};
