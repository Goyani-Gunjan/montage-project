import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdContentCopy, MdDelete } from "react-icons/md";

type Module = {
  id: number;
  name: string;
  description: string;
};

const DropdownMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
}) => {
  return (
    isOpen && (
      <div className="absolute  ml-2 top-0  w-48 bg-white shadow-lg border border-gray-200 rounded-md p-2 z-10">
        <p className="text-xs text-gray-500 px-2">View Module details</p>

        {/* Copy Option */}
        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdContentCopy size={18} className="mr-2" />
          Copy
          <span className="ml-auto text-xs text-gray-500">Ctrl + C</span>
        </button>

        {/* Delete Option */}
        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdDelete size={18} className="mr-2" />
          Delete
          <span className="ml-auto text-xs text-gray-500">Delete</span>
        </button>
      </div>
    )
  );
};

const DesignList: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const modules: Module[] = [
    { id: 1, name: "Annex-1", description: "Saved File Name" },
    { id: 2, name: "Annex-2", description: "Module description" },
  ];

  return (
    <div className="w-65 bg-gray-100 p-2 h-screen overflow-y-auto">
      <div>
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2 relative w-50"
          >
            <div>
              <p className="text-sm font-semibold">{module.name}</p>
              <p className="text-xs text-gray-500">{module.description}</p>
            </div>
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === module.id ? null : module.id
                  )
                }
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <DropdownMenu
                isOpen={activeDropdown === module.id}
                onClose={() => setActiveDropdown(null)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignList;
