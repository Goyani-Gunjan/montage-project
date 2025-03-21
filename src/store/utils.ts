export const processMeshesForModel = (model: ModelData, is3D: boolean) => {
  model.meshes.forEach((mesh) => {
    if (mesh) {
      if (!mesh.originalMaterial) {
        mesh.originalMaterial = mesh.material.clone();
      }

      if (is3D) {
        // 3D Mode handling
        if (mesh.name.includes("Node")) {
          mesh.material = mesh.originalMaterial.clone();
          mesh.material.color.set("cyan");
        } else {
          // Keep original material for all other parts in 3D
          mesh.material = mesh.originalMaterial.clone();
        }
        mesh.visible = true;
      } else {
        // 2D Mode handling
        if (mesh.name.includes("Node")) {
          mesh.material = mesh.originalMaterial.clone();
          mesh.material.color.set("cyan");
          mesh.visible = true;
        } else if (mesh.name.includes("Roof")) {
          mesh.material = mesh.originalMaterial.clone();
          mesh.visible = false;
        } else if (mesh.name.includes("Floor")) {
          mesh.material = mesh.originalMaterial.clone();
          mesh.material.color.set("#ffffff");
          mesh.material.emissive.set("#444444");
          mesh.material.metalness = 0;
          mesh.material.roughness = 0.5;
          mesh.visible = true;
        } else if (
          mesh.name.includes("ExternalWall") ||
          mesh.name.includes("Wall")
        ) {
          // Ensure walls are visible in 2D mode
          mesh.material = mesh.originalMaterial.clone();
          mesh.visible = true;
        } else {
          // Default for other mesh types
          mesh.material = mesh.originalMaterial.clone();
          mesh.visible = true;
        }
      }

      // Ensure texture is preserved if it exists
      if (mesh.originalMaterial && mesh.originalMaterial.map) {
        mesh.material.map = mesh.originalMaterial.map;
        mesh.material.needsUpdate = true;
      }
    }
  });
};
