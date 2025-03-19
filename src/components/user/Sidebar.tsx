import { FaBookmark, FaCubes, FaPencilRuler } from "react-icons/fa";

type SidebarProps = {
  setActiveSidebar: (sidebar: "Design" | "Modules") => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSidebar }) => {
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
    <div className="fixed  h-screen p-4 bg-gray-100 shadow-md flex flex-col items-center pt-4 space-y-1">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center h-16 w-20 pt-3 text-sm hover:bg-gray-300 cursor-pointer "
          onClick={() => setActiveSidebar(item.name as "Design" | "Modules")}
        >
          {item.icon}
          <span className="m-2">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
