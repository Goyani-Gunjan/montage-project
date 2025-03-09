// import DesignLeftBar from "./DesignLeftBar";
import RightBar from "./DesignRightBar";
import ModuleLeftbar from "./ModuleLeftbar";
import Navbar from "./SecondNavbar";
import Sidebar from "./Sidebar";

const DesignPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex mt-16">
        <Sidebar />
        <div className="ml-16 flex h-[calc(100vh-4rem)] w-full">
          {/* <DesignLeftBar /> */}
          <ModuleLeftbar />
          <div className="flex-1 bg-gray-50 p-10 flex items-center justify-center"></div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
