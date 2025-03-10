import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdContentCopy,
  MdDelete,
  MdLock,
  MdContentPaste,
} from "react-icons/md";

const DropdownMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    isOpen && (
      <div className="absolute right-0 top-10 w-40 bg-white shadow-lg border border-gray-200 rounded-md p-2 z-10">
        <p className="text-xs text-gray-500 px-2">View Module details</p>

        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdContentCopy size={18} className="mr-2" />
          Copy
          <span className="ml-auto text-xs text-gray-500">Ctrl + C</span>
        </button>

        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdContentPaste size={18} className="mr-2" />
          Paste
          <span className="ml-auto text-xs text-gray-500">Ctrl + V</span>
        </button>

        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdDelete size={18} className="mr-2" />
          Delete
          <span className="ml-auto text-xs text-gray-500">Delete</span>
        </button>

        <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded">
          <MdLock size={18} className="mr-2" />
          Lock
          <span className="ml-auto text-xs text-gray-500">Ctrl+Alt+L</span>
        </button>
      </div>
    )
  );
};

const DesignList: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const modules = [
    { id: 1, name: "Annex" },
    { id: 2, name: "Annex" },
  ];

  return (
    <div className="w-65 bg-gray-100 p-2 h-screen overflow-y-auto">
      <div>
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2 relative w-50 group"
          >
            <div className="flex items-center">
              <div className="bg-black text-white w-15 h-8 flex items-center justify-center rounded-md mr-2 gap-4">
                <div>A</div>
                <div>1</div>
              </div>
              <div>
                <p className="text-sm font-semibold">{module.name}</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === module.id ? null : module.id
                  )
                }
                className="p-2 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <DropdownMenu isOpen={activeDropdown === module.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignList;
