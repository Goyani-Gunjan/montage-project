import { IoSearchSharp } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import Dwelling from "./Dwelling";
import Annex from "./Annex";
import LifeStyle from "./LifeStyle";
import { useEffect, useState } from "react";
import { fetchGet } from "../../utils/FetchApi";
import Cookies from "js-cookie";
import UIStore from "../../store/UIStore";

interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

const ModuleLeftbar = () => {
  const [activeComponent, setActiveComponent] = useState("Annex");

  useEffect(() => {
    const fetchModules = async () => {
      const token: string = Cookies.get("token");

      const response = await fetchGet<Module[]>("/modules", token);

      if (response.success && Array.isArray(response.data)) {
        UIStore.setModules(response.data);
      } else {
        UIStore.setModules([]);
      }
    };

    fetchModules();
  }, []);
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
    <div className="w-80 p-4 text-black bg-gray-100 h-screen overflow-y-auto fixed top-16">
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
        {["Annex", "Dwelling", "Lifestyle"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveComponent(type)}
            className={`text-sm border border-gray-400 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer ${
              activeComponent === type ? "bg-gray-300" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <hr className=" border border-gray-200" />

      <div className="space-y-4 flex-1 p-2 ">{renderComponent()}</div>
    </div>
  );
};

export default ModuleLeftbar;
