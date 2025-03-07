import {
  FaBookmark,
  FaCubes,
  FaFolderOpen,
  FaList,
  FaPencilRuler,
  FaTh,
} from "react-icons/fa";
import Navbar from "./SecondNavbar";

// Sidebar Component
const Sidebar = () => {
  const menuItems = [
    {
      name: "Design",
      icon: <FaPencilRuler className="text-gray-600 text-xl" />,
    },
    {
      name: "Templates",
      icon: <FaFolderOpen className="text-gray-600 text-xl" />,
    },
    { name: "Modules", icon: <FaCubes className="text-gray-600 text-xl" /> },
    { name: "Saved", icon: <FaBookmark className="text-gray-600 text-xl" /> },
  ];
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-gray-100 shadow-md flex flex-col items-center pt-10 space-y-6">
      {menuItems.map((item) => (
        <div key={item.name} className="flex flex-col items-center text-sm">
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

// Left Panel Component
const DesignLeftBar = () => {
  return (
    <div className="fixed top-16 w-64 bg-white p-4 shadow-md h-[calc(100vh-4rem)] mt-3 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Design</h2>
        <div className="flex space-x-2">
          <FaTh className="text-gray-600 cursor-pointer" />
          <FaList className="text-gray-600 cursor-pointer" />
        </div>
      </div>
      {/* Scrollable Design List */}
      <div className="mt-4 space-y-4 overflow-y-auto flex-1">
        <div className="w-full h-24 bg-gray-200 rounded"></div>
        <div className="w-full h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

// Right Panel Component
const RightBar = () => {
  return (
    <div className=" w-64 bg-white p-4 shadow-md h-[calc(100vh-4rem)] overflow-y-auto mt-3">
      <h2 className="text-lg font-semibold">Exterior Finish</h2>
      <div className="mt-2 flex space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
      <h2 className="mt-4 text-lg font-semibold">Exterior Accent</h2>
      <div className="mt-2 flex space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-4 text-xl font-bold">$64,000</div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
        Order Now
      </button>
    </div>
  );
};

// Main App Component
const DesignPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex mt-16">
        <Sidebar />
        <div className="ml-16 flex h-[calc(100vh-4rem)] w-full">
          <DesignLeftBar />
          <div className="flex-1 bg-gray-50 p-10 flex items-center justify-center"></div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
