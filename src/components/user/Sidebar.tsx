import {
  FaBookmark,
  FaCubes,
  FaFolderOpen,
  FaPencilRuler,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Design",
      icon: <FaPencilRuler className="text-gray-600 text-xl " />,
    },
    {
      name: "Templates",
      icon: <FaFolderOpen className="text-gray-600 text-xl " />,
    },
    {
      name: "Modules",
      icon: <FaCubes className="text-gray-600 text-xl  " />,
    },
    {
      name: "Saved",
      icon: <FaBookmark className="text-gray-600 text-xl " />,
    },
  ];
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-gray-100 shadow-md flex flex-col items-center pt-10 space-y-6">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center text-sm hover:bg-gray-300 cursor-pointer"
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
