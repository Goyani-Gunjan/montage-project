import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function addEdgesToMesh(mesh, color, transparent = true) {
  let edges = new THREE.EdgesGeometry(mesh.geometry, 80);
  let line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: color,
      transparent: transparent,
      opacity: 0.4,
    })
  );
  line.name = "edges";
  mesh.parent.add(line);
}

const Scene = ({ is3D }: { is3D: boolean }) => {
  const { scene } = useGLTF("/Annex_tag.glb");

  React.useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes("Node") && child.material) {
          child.material = child.material.clone();
          child.material.color.set("cyan");
          return;
        }

        if (!is3D && child.geometry && !child.name.includes("Node")) {
          addEdgesToMesh(child, "black");
        }
        child.visible = is3D;
      }
    });
  }, [scene, is3D]);

  return (
    <>
      <OrthographicCamera
        makeDefault={!is3D}
        position={[0, 5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        zoom={100}
      />
      <PerspectiveCamera makeDefault={is3D} fov={75} position={[0, 5, 5]} />
      <OrbitControls enableRotate={is3D} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <primitive object={scene} />
    </>
  );
};

const App = () => {
  const [is3D, setIs3D] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Canvas>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="gray" />
            </mesh>
          }
        >
          <Scene is3D={is3D} />
        </Suspense>
      </Canvas>
      <button
        onClick={() => setIs3D(!is3D)}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          padding: "8px 16px",
        }}
      >
        Switch to {is3D ? "2D" : "3D"}
      </button>
    </div>
  );
};

export default App;
