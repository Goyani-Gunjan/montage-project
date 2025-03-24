import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { fetchGet } from "../../utils/FetchApi";
// import { loadTexture } from "../../utils/Loader";
import OrderButton from "./OrderButoon";
import Manager from "../../store/Manager";
import { Material, Style, SubStyle } from "../../store/types";

interface RightBarProps {
  isOpen: boolean;
}

const RightBar = ({ isOpen }: RightBarProps) => {
  const manager = new Manager();
  const [styles, setStyles] = useState<Style | undefined>(undefined);
  const [selectedMaterials, setSelectedMaterials] = useState<{
    [key: number]: Material;
  }>({});
  const isDataFetched = useRef(false);

  const fetchStyles = async () => {
    const token: string | undefined = Cookies.get("token");
    const response = await fetchGet<Style>("/styles", token);

    if (response.success) {
      setStyles(response.data);
      manager.uiStore.setStyles(response.data);

      const defaultSelectedMaterials: { [key: number]: Material } = {};
      response?.data?.subStyleList.forEach((subStyle: SubStyle) => {
        if (subStyle.materialList.length > 0) {
          defaultSelectedMaterials[subStyle.id] = subStyle.materialList[0];
          manager.uiStore.setSelectedMaterial(
            subStyle.id,
            subStyle.materialList[0]
          );
          // loadTexture(subStyle.materialList[0].imageURL);
        }
      });
      setSelectedMaterials(defaultSelectedMaterials);
    } else {
      console.error("Error fetching styles:", response.message);
    }
  };

  useEffect(() => {
    if (!isDataFetched.current) {
      fetchStyles();
      isDataFetched.current = true; // Mark data as fetched
    }
  }, []);

  const handleMaterialClick = (subStyleId: number, material: Material) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [subStyleId]: material,
    }));
    manager.uiStore.setSelectedMaterial(subStyleId, material);
    // loadTexture(material.imageURL);

    // console.log("Configured Style:", manager.uiStore.configuredStyle);
  };

  return (
    <div>
      <div
        className={`w-85 top-[72px] h-screen pb-36 bg-white p-4 border-l border-gray-200 overflow-y-auto fixed right-0 transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {" "}
        <div className="flex items-center justify-center mb-4 mt-3">
          <h2 className="text-2xl font-semibold text-center">
            {manager.uiStore.totalBedrooms} Bed {manager.uiStore.totalBathrooms}{" "}
            Bath {manager.uiStore.totalSize} sqft
          </h2>
        </div>
        {styles && styles?.subStyleList?.length > 0 ? (
          styles.subStyleList.map((subStyle) => (
            <div key={subStyle.id} className="mb-6">
              <div className="w-full h-50 bg-gray-200 rounded flex items-center justify-center relative mt-5">
                {subStyle.materialList.length > 0 && (
                  <img
                    src={
                      selectedMaterials[subStyle.id]?.imageURL ??
                      subStyle.materialList[0].imageURL
                    }
                    alt="Selected Material"
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              <h3 className="text-lg font-medium mb-3 text-center">
                {subStyle.name}
              </h3>

              <div className="flex gap-2 flex-wrap justify-center mt-3">
                {subStyle.materialList.length > 0 ? (
                  subStyle.materialList.map((material) => (
                    <div
                      key={material.id}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handleMaterialClick(subStyle.id, material)}
                    >
                      <img
                        src={material.imageURL}
                        alt={material.name}
                        className={`w-10 h-10 object-cover rounded transition ${
                          selectedMaterials[subStyle.id]?.id === material.id
                            ? "ring-1 ring-black-300 p-1"
                            : ""
                        }`}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No materials available.
                  </p>
                )}
              </div>
              {subStyle.materialList.length > 0 && (
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">
                    {selectedMaterials[subStyle.id]?.name ??
                      subStyle.materialList[0].name}
                  </p>
                  <p className="text-sm text-gray-600">
                    $
                    {selectedMaterials[subStyle.id]?.price ??
                      subStyle.materialList[0].price}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No sub-styles available.</p>
        )}
      </div>
      <OrderButton isOpen={isOpen} />
    </div>
  );
};

export default RightBar;
