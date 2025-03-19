import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Manager from "../../store/Manager";
import DesignLeftBar from "../design/DesignLeftBar";
import Navbar from "../design/DesignNavbar";
import ModuleLeftbar from "../module/ModuleLeftbar";
import RightBar from "./DesignRightBar";
import Sidebar from "./Sidebar";
import CanvasWithDrop from "../canvas/CanvasWithDrop";
import { observer } from "mobx-react";
import Model from "../canvas/Model";

type SidebarType = "Design" | "Modules"; // Define types for sidebar options

const DesignPage = observer(() => {
  const manager = new Manager();
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>("Modules");
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar setActiveSidebar={setActiveSidebar} />
        <div className="flex-1 flex flex-col">
          {activeSidebar === "Design" ? <DesignLeftBar /> : <ModuleLeftbar />}
          <div className="flex items-center justify-center">
            <div className="w-180 h-screen">
              <Canvas>
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
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    </div>
  );
});

export default DesignPage;
