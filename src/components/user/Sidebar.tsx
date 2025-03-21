import { useState } from "react";
import { FaBookmark, FaCubes, FaPencilRuler } from "react-icons/fa";

type SidebarProps = {
  setActiveSidebar: (sidebar: "Design" | "Modules") => void;
  selectedSidebar: string;
  handleSidebarChange: (name: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  setActiveSidebar,
  selectedSidebar,
  handleSidebarChange,
}) => {
  const menuItems = [
    {
      name: "Design",
      icon: <FaPencilRuler className="text-gray-600 text-xl" />,
    },

    {
      name: "Modules",
      icon: <FaCubes className="text-gray-600 text-xl  " />,
    },
    {
      name: "Bookmarks",
      icon: <FaBookmark className="text-gray-600 text-xl " />,
    },
  ];

  return (
    <div className="fixed top-[72px] left-0  h-screen w-20 bg-gray-100 shadow-md flex flex-col items-center pt-4 space-y-1 z-10">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col items-center w-18 m-2 p-2 rounded text-sm hover:bg-gray-300 cursor-pointer ${
            selectedSidebar === item.name ? "bg-gray-300" : ""
          }`}
          onClick={() => handleSidebarChange(item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
