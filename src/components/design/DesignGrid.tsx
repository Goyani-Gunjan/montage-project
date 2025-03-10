import { BsThreeDotsVertical } from "react-icons/bs";

const DesignGrid = () => {
  return (
    <div className="mt-2 space-y-4 overflow-y-auto flex-1 p-2">
      <div className="relative w-full rounded flex flex-col items-start group">
        <div className="w-full flex justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className=" p-2 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
            <BsThreeDotsVertical size={20} />
          </button>
        </div>

        <div className="w-full">
          <img
            src="assets/cineapp.png"
            alt="Design"
            className="w-full h-full object-cover rounded-b"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignGrid;
