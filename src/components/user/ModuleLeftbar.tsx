import { IoSearchSharp } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";

const ModuleLeftbar = () => {
  return (
    <div className="w-75 p-4 text-black bg-gray-100 h-screen overflow-y-auto fixed top-16">
      <h1 className="text-lg font-semibold mt-2">Modules</h1>
      <hr />

      <div className="flex justify-between items-center border border-gray-400 rounded my-3 p-2 ">
        <IoSearchSharp size={20} />
        <input
          type="text"
          placeholder="Search Modules"
          className="bg-transparent text-black flex-1 outline-none px-2 text-sm w-auto"
        />
        <BsSliders size={20} className="cursor-pointer" />
      </div>
      <hr />

      <div className="flex justify-around my-3">
        <button className="text-sm border border-gray-400  px-2 py-1 rounded hover:bg-gray-300 cursor-pointer">
          Annex
        </button>
        <button className="text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer">
          Dwelling
        </button>
        <button className="text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer">
          LifeStyle
        </button>
      </div>
      <hr />

      <div className="my-3 w-full space-y-2">
        <div className="w-full h-24 bg-gray-200 rounded"></div>
        <div className="w-full h-24 bg-gray-200 rounded"></div>

        <div className="w-full h-24 bg-gray-200 rounded"></div>

        <div className="w-full h-24 bg-gray-200 rounded"></div>

        <div className="w-full h-24 bg-gray-200 rounded"></div>
        <div className="w-full h-24 bg-gray-200 rounded"></div>

        <div className="w-full h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ModuleLeftbar;
