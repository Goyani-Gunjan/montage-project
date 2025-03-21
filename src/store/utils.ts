import { ModelData } from "./types";
import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();

export const processMeshesForModel = (
  model: ModelData,
  is3D: boolean,
  externalWallURL?: string,
  internalWallURL?: string
) => {
  model.meshes.forEach((mesh) => {
    if (mesh) {
      if (is3D) {
        if (mesh.name.includes("Node")) {
          if (mesh.processed) {
            mesh.material = mesh.material.clone();
            mesh.processed = true;
          }
          mesh.material.color.set("cyan");
          mesh.visible = true;
        }
        if (mesh.name.includes("External_Wall")) {
          mesh.material = mesh.material.clone();
          const texture = textureLoader.load("/wood.jpg");
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.colorSpace = THREE.LinearSRGBColorSpace;
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        }
        if (mesh.name.includes("Internal_Wall")) {
          mesh.material = mesh.material.clone();
          const texture = textureLoader.load("/wood.jpg");
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.colorSpace = THREE.LinearSRGBColorSpace;
          mesh.material.map = texture;
          mesh.material.needsUpdate = true;
        } else {
          mesh.visible = true;
        }
      } else {
        if (mesh.name.includes("Node")) {
          if (!mesh.processed) {
            mesh.material = mesh.material.clone();
            mesh.material.color.set("cyan");
            mesh.processed = true;
          }
          mesh.visible = true;
        }
        if (mesh.name.includes("Roof")) {
          if (!mesh.processed) {
            mesh.material = mesh.material.clone();
            mesh.processed = true;
          }
          mesh.visible = false;
        }
        if (mesh.name.includes("Floor")) {
          if (!mesh.processed) {
            mesh.material = mesh.material.clone();
            mesh.material.color.set("#ffffff");
            mesh.material.emissive.set("#444444");
            mesh.material.metalness = 0;
            mesh.material.roughness = 0.5;
            mesh.processed = true;
          }
          mesh.visible = true;
        }
      }
    }
  });
};
