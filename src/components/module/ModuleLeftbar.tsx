import { IoSearchSharp } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import Dwelling from "./Dwelling";
import Annex from "./Annex";
import LifeStyle from "./LifeStyle";
import { useState } from "react";

const ModuleLeftbar = () => {
  const [activeComponent, setActiveComponent] = useState("Annex");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Annex":
        return <Annex />;
      case "Dwelling":
        return <Dwelling />;
      case "Lifestyle":
        return <LifeStyle />;
      default:
        return <Annex />;
    }
  };
  return (
    <div className="w-90 p-4 text-black bg-gray-100 h-screen overflow-y-auto fixed top-16">
      <h1 className="text-lg font-semibold mt-2">Modules</h1>
      <hr className=" border border-gray-200" />

      <div className="flex justify-between items-center border border-gray-400 rounded my-3 p-2 ">
        <IoSearchSharp size={20} />
        <input
          type="text"
          placeholder="Search Modules"
          className="bg-transparent text-black flex-1 outline-none px-2 text-sm w-auto"
        />
        <BsSliders size={20} className="cursor-pointer" />
      </div>
      <hr className=" border border-gray-200" />

      <div className="flex justify-around my-3">
        <button
          onClick={() => setActiveComponent("Annex")}
          className={`text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer ${
            activeComponent === "Annex" ? "bg-gray-300" : ""
          }`}
        >
          Annex
        </button>
        <button
          onClick={() => setActiveComponent("Dwelling")}
          className={`text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer ${
            activeComponent === "Dwelling" ? "bg-gray-300" : ""
          }`}
        >
          Dwelling
        </button>
        <button
          onClick={() => setActiveComponent("Lifestyle")}
          className={`text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer ${
            activeComponent === "Lifestyle" ? "bg-gray-300" : ""
          }`}
        >
          Lifestyle
        </button>
      </div>
      <hr className=" border border-gray-200" />

      <div className="space-y-4 flex-1 p-2 ">{renderComponent()}</div>
    </div>
  );
};

export default ModuleLeftbar;
