import { Edges } from "@react-three/drei";

const ModelRenderer = ({ meshes, manager }) => {
  return (
    <>
      {meshes.map((meshData) => {
        if (!manager.montageStore.is3D) {
          const isNode = meshData.name.includes("Node");
          const isFloor = meshData.name.includes("Floor");
          if (isNode) {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
                material={meshData.material}
              >
                <primitive
                  object={meshData.material.clone().color.set("cyan")}
                />
              </mesh>
            );
          }
          if (isFloor) {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
                material={meshData.material}
              >
                <primitive
                  object={meshData.material.clone().color.set("#f3f3f0")}
                />
              </mesh>
            );
          } else {
            return (
              <mesh
                key={meshData.id}
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
              >
                <Edges color="black" />
              </mesh>
            );
          }
        }

        return (
          <mesh
            key={meshData.id}
            geometry={meshData.geometry}
            material={meshData.material}
            matrixAutoUpdate={false}
            matrix={meshData.matrix}
            visible={meshData.visible}
          />
        );
      })}
    </>
  );
};

export default ModelRenderer;
