import { BsThreeDotsVertical } from "react-icons/bs";

const DesignGrid = () => {
  return (
    <div className="mt-2 space-y-4 overflow-y-auto flex-1 p-2">
      <div className="relative w-full rounded flex flex-col items-start group bg-white hover:border hover:border-gray-500  border border-gray-300">
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-1 rounded cursor-pointer hover:bg-gray-200">
            <BsThreeDotsVertical size={20} />
          </button>
        </div>

        <div className="w-full flex flex-col gap-2 p-2">
          <img
            src="assets/cineapp.png"
            className="w-full px-8 py-2 h-32 object-fit"
          />

          <div className="flex justify-between w-full text-gray-700 space-x-2">
            <h3 className="text-sm font-semibold">name</h3>
            <span className="text-sm"> $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignGrid;
