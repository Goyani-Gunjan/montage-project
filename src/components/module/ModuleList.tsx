import { observer } from "mobx-react-lite";
import { BsThreeDotsVertical } from "react-icons/bs";
import Manager from "../../store/Manager";

interface ModuleListProps {
  searchValue: string;
  moduleType: string;
}

const ModuleList = observer(({ searchValue, moduleType }: ModuleListProps) => {
  const manager = new Manager();
  const filteredModules = manager.uiStore.modules.filter(
    (module) =>
      module.name.includes(moduleType) &&
      module.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleModuleClick = (module: any) => {
    manager.uiStore.addSelectedModule(module);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    module: any
  ) => {
    event.dataTransfer.setData("text/uri-list", module.glbFile);
    event.dataTransfer.setData("application/json", JSON.stringify(module));
  };
  return (
    <div className="space-y-4 flex-1 p-1">
      {filteredModules.map((module) => (
        <div
          key={module.id}
          className="relative w-full rounded flex flex-col items-start group bg-white hover:border hover:border-gray-500 border border-gray-300"
          onClick={() => handleModuleClick(module)}
          draggable
          onDragStart={(e) => handleDragStart(e, module)}
        >
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 rounded cursor-pointer hover:bg-gray-200">
              <BsThreeDotsVertical size={20} />
            </button>
          </div>

          <div className="w-full flex flex-col gap-2 mt-2 p-2 ">
            <img
              src={module.moduleImage}
              className="w-full px-12 py-2 h-48 object-fit rounded-b"
            />
            <h3 className="text-md  font-semibold">{module.name}</h3>
            <div className="flex justify-between w-full text-gray-700 text-xs space-x-1">
              <span> ${module.pricePerSqft}</span>
              <span>{module.noOfBedrooms} Bathroom</span>
              <span> {module.noOfBathrooms} Bedroom</span>
              <span>{module.size} sqft</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ModuleList;
