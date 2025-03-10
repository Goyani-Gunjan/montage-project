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
      <div className="flex mt-16">
        <Sidebar setActiveSidebar={setActiveSidebar} />
        <div className="ml-16 flex h-[calc(100vh-4rem)] w-full">
          {activeSidebar === "Design" ? <DesignLeftBar /> : <ModuleLeftbar />}
          <div className="flex-1 bg-gray-50 p-10 flex items-center justify-center"></div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
