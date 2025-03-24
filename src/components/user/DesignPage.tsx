import {
  CameraControls,
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
import TopButtons from "../../utils/TopButtons";
import {
  ClosingButtons,
  RightBarToggleButton,
} from "../../utils/ClosingButtons";
import { ModelData } from "../../store/types";

type SidebarType = "Design" | "Modules";

interface SidebarChangeHandler {
  (name: string): void;
}

const DesignPage: React.FC = observer(() => {
  const manager = new Manager();
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>("Design");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(true);
  const [selectedSidebar, setSelectedSidebar] = useState<string>("Design");

  const handlePointerMissed = (): void => {
    if (manager.montageStore.selectedModelId) {
      manager.montageStore.toggleShowControls(
        manager.montageStore.selectedModelId,
        false
      );
    }
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleRightBar = (): void => {
    setIsRightBarOpen((prev) => !prev);
  };

  const handleSidebarChange: SidebarChangeHandler = (name) => {
    setSelectedSidebar(name);
    if (name !== "Bookmark") {
      setActiveSidebar(name as SidebarType);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          setActiveSidebar={setActiveSidebar}
          selectedSidebar={selectedSidebar}
          handleSidebarChange={handleSidebarChange}
        />
        <div className="flex-1 flex flex-col">
          {isSidebarOpen &&
            (activeSidebar === "Design" ? (
              <DesignLeftBar handleSidebarChange={handleSidebarChange} />
            ) : (
              <ModuleLeftbar />
            ))}
          <div className="flex items-center justify-center">
            <div className="w-full h-screen ml-14 mt-10 relative">
              <div className="absolute top-14 right-90 z-10">
                <TopButtons />
              </div>
              <Canvas shadows onPointerMissed={handlePointerMissed}>
                <Suspense fallback={null}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <CanvasWithDrop />
                  {!manager.montageStore.is3D && (
                    <gridHelper args={[100, 100, "red", "lightgray"]} />
                  )}
                  {manager.montageStore.models.map(
                    (model: ModelData, index: number) => (
                      <Model
                        key={index}
                        path={model.path}
                        position={model.position}
                        id={model.id}
                      />
                    )
                  )}
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
                  <CameraControls
                    makeDefault
                    minZoom={20}
                    maxZoom={250}
                    azimuthRotateSpeed={manager.montageStore.is3D ? 1 : 0}
                    polarRotateSpeed={manager.montageStore.is3D ? 1 : 0}
                  />
                </Suspense>
              </Canvas>
              <ClosingButtons
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              <RightBarToggleButton
                isRightBarOpen={isRightBarOpen}
                toggleRightBar={toggleRightBar}
              />
            </div>
          </div>
        </div>
        {isRightBarOpen && <RightBar isOpen={isRightBarOpen} />}
      </div>
    </div>
  );
});

export default DesignPage;
