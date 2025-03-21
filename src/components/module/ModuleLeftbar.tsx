import { IoSearchSharp } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import ModuleList from "./ModuleList";
import { useEffect, useState } from "react";
import { fetchGet } from "../../utils/FetchApi";
import Cookies from "js-cookie";
import Manager from "../../store/Manager";

interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

const ModuleLeftBar = () => {
  const manager = new Manager();
  const [activeComponent, setActiveComponent] = useState("Annex");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      const token: string = Cookies.get("token");

      const response = await fetchGet<Module[]>("/modules", token);

      if (response.success && Array.isArray(response.data)) {
        manager.uiStore.setModules(response.data);
      } else {
        manager.uiStore.setModules([]);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="p-3 text-black bg-gray-100 fixed border-l border-gray-200 top-[72px] left-[80px] z-10">
      <h1 className="text-lg font-semibold mt-2">Modules</h1>
      <hr className=" border border-gray-200" />

      <div className="flex justify-between items-center border-2 border-gray-300 rounded-md my-3 p-3 ">
        <IoSearchSharp size={20} className="text-gray-400 font-semibold" />
        <input
          type="text"
          placeholder="Search Modules"
          className="bg-transparent text-gray-600 flex-1 outline-none px-2 text-sm w-auto"
          value={searchValue}
          onChange={(e) => {
            console.log("Search Value in ModuleLeftbar:", e.target.value);
            setSearchValue(e.target.value);
          }}
        />
        <BsSliders size={17} className="cursor-pointer" />
      </div>
      <hr className=" border border-gray-200" />

      <div className="flex justify-around my-3">
        {["Annex", "Dwelling", "Lifestyle"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveComponent(type)}
            className={`text-sm border border-gray-400 px-3 py-2 rounded hover:bg-gray-300 cursor-pointer ${
              activeComponent === type ? "bg-gray-300" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <hr className=" border border-gray-200" />

      <div className="space-y-4 flex p-2 mt-3 h-[calc(100vh-16rem)] overflow-y-auto">
        <ModuleList searchValue={searchValue} moduleType={activeComponent} />
      </div>
    </div>
  );
};

export default ModuleLeftBar;
