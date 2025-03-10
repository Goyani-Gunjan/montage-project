import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { fetchGet } from "../../utils/FetchApi";
import Cookies from "js-cookie";

interface Module {
  id: number;
  name: string;
  moduleImage: string;
  pricePerSqft: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  size: number;
}

const Annex = () => {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      const token: string | null = Cookies.get("token") ?? null;
      const response = await fetchGet<Module[]>("/modules", token);

      if (response.success && Array.isArray(response.data)) {
        setModules(response.data);
      } else {
        setModules([]);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="space-y-4 flex-1 p-1">
      {modules
        .filter((module) => module.name.includes("Annex"))
        .map((module) => (
          <div
            key={module.id}
            className="relative w-full rounded flex flex-col items-start group bg-white hover:border hover:border-black hover:scale-105 transition-all duration-300e"
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <BsThreeDotsVertical size={20} />
              </button>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2 p-2">
              <img
                src={module.moduleImage}
                className="w-full h-70 object-fit rounded-b"
              />
              <h3 className="text-lg mb-2 ml-2 font-semibold">{module.name}</h3>
              <div className="flex justify-between w-full  text-gray-700 text-sm space-x-2">
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
};

export default Annex;
