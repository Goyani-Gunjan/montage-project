import { Edges } from "@react-three/drei";
import * as THREE from "three";

const ModelRenderer = ({ meshes, manager }) => {
  const createEdgesGeometry = (geometry) => {
    return new THREE.EdgesGeometry(geometry);
  };

  return (
    <>
      {meshes.map((meshData) => {
        if (!manager.montageStore.is3D) {
          const isNode = meshData.name?.includes("Node");
          const isFloor = meshData.name?.includes("Floor");

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
              >
                <primitive
                  object={meshData.material.clone().color.set("#f3f3f0")}
                />
              </mesh>
            );
          }

          return (
            <group key={meshData.id}>
              <mesh
                geometry={meshData.geometry}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
              >
                <Edges color="black" opacity={0.2} />
              </mesh>

              <lineSegments
                geometry={createEdgesGeometry(meshData.geometry)}
                matrixAutoUpdate={false}
                matrix={meshData.matrix}
                visible={meshData.visible}
              >
                <lineBasicMaterial color="black" opacity={0.2} transparent />
              </lineSegments>
            </group>
          );
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
