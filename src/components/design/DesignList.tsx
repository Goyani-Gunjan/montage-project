import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from "../../utils/DropdownMenu";

const DesignList: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const modules = [
    { id: 1, name: "Annex" },
    { id: 2, name: "Annex" },
    { id: 3, name: "Annex" },
    { id: 4, name: "Annex" },
    { id: 5, name: "Annex" },
    { id: 6, name: "Annex" },
  ];

  return (
    <div className="w-64 mt-3 bg-gray-100 h-screen overflow-y-auto">
      <div>
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between hover:bg-white p-3 rounded-lg shadow-md mb-2 relative w-50 group"
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
                className="p-2 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <div>
                <DropdownMenu isOpen={activeDropdown === module.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignList;
