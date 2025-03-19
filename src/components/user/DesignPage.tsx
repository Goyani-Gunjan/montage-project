import DesignLeftBar from "../design/DesignLeftBar";
import RightBar from "./DesignRightBar";
import ModuleLeftbar from "../module/ModuleLeftbar";
import Navbar from "../design/DesignNavbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

type SidebarType = "Design" | "Modules"; // Define types for sidebar options

const DesignPage = () => {
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>("Modules");
  return (
    <div>
      <Navbar />
      <div className="relative top-18 left-24 w-full flex">
        <Sidebar setActiveSidebar={setActiveSidebar} />
        <div className="flex h-[calc(100vh-4rem)] w-full">
          {activeSidebar === "Design" ? <DesignLeftBar /> : <ModuleLeftbar />}
          <div className="flex-1 bg-gray-50 p-5 flex items-center justify-center"></div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
