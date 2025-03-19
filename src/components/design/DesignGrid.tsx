import { observer } from "mobx-react-lite";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbPlus } from "react-icons/tb";
import DropdownMenu from "../../utils/DropdownMenu";
import { useState } from "react";
import UIStore from "../../store/UIStore";

const DesignGrid = observer(() => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <div className="mt-2 space-y-4 overflow-y-auto flex-1 p-2">
      {UIStore.selectedModules.map((module, index) => (
        <div
          key={index}
          className="relative w-full rounded flex flex-col items-start group bg-white hover:border hover:border-gray-500 border border-gray-300"
        >
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === module.id ? null : module.id
                )
              }
              className="p-1 rounded cursor-pointer hover:bg-gray-200"
            >
              <BsThreeDotsVertical size={20} />
              <DropdownMenu isOpen={activeDropdown === module.id} />
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 p-2">
            <img
              src={module.moduleImage}
              alt={module.name}
              className="w-full px-8 py-2 h-32 object-fit"
            />
            <div className="flex justify-between w-full text-gray-700 space-x-2">
              <h3 className="text-sm font-semibold">{module.name}</h3>{" "}
              <span className="text-sm">{index + 1}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full h-32 bg-gray-200 flex flex-col items-center justify-center rounded border border-gray-300 relative hover:bg-gray-300 group transition-colors duration-200">
        <div className="p-1 rounded-full group-hover:bg-gray-400 transition-colors duration-200 cursor-pointer">
          <TbPlus size={32} />
        </div>
        <div className="mt-2 px-3 py-1 bg-gray-400 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Add Module
        </div>
      </div>
    </div>
  );
});

export default DesignGrid;
