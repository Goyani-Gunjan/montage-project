import * as THREE from "three";
import moduleStore from "../store/UIStore";

export const loadTexture = (
  url: string,
  onLoad?: (texture: THREE.Texture) => void
) => {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    url,
    (texture) => {
      if (onLoad) onLoad(texture);
      moduleStore.setTexture(url, texture);
    },
    () => {
      console.log("Loading texture...");
    },
    (error) => {
      console.error("Error loading texture:", error);
    }
  );
};
