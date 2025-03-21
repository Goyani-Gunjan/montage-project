import * as THREE from "three";
import Manager from "../store/Manager";

export const loadTexture = (
  url: string,
  onLoad?: (texture: THREE.Texture) => void
) => {
  const manager = new Manager();
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    url,
    (texture) => {
      if (onLoad) onLoad(texture);
      manager.uiStore.setTexture(url, texture);
    },
    () => {
      console.log("Loading texture...");
    },
    (error) => {
      console.error("Error loading texture:", error);
    }
  );
};
