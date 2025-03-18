import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { observer } from "mobx-react-lite";
import Sidebar from "./Sidebar";
import CanvasWithDrop from "./CanvasWithDrop";
import Manager from "./store/Manager";
import Model from "./Model";

const App = observer(() => {
  const manager = new Manager();

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "10px 20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => manager.montageStore.toggle3D()}
      >
        Toggle to {manager.montageStore.is3D ? "2D" : "3D"} View
      </button>

      <Canvas shadows onPointerMissed={() => console.log("missed")}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <CanvasWithDrop />
          <gridHelper args={[100, 100, "red", "lightgray"]} />

          {manager.montageStore.models.map((model, index) => (
            <Model
              key={index}
              path={model.path}
              position={model.position}
              id={model.id}
            />
          ))}
        </Suspense>
        <PerspectiveCamera
          makeDefault={manager.montageStore.is3D}
          fov={75}
          position={[0, 5, 5]}
        />
        <OrthographicCamera
          makeDefault={!manager.montageStore.is3D}
          position={[0, 5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          zoom={100}
        />
        <OrbitControls enableRotate={manager.montageStore.is3D} />
      </Canvas>

      <Sidebar />
    </div>
  );
});

export default App;
