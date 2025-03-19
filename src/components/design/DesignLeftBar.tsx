import { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";
import DesignList from "./DesignList";
import DesignGrid from "./DesignGrid";

const DesignLeftBar = () => {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="fixed top-[72px] left-[80px] w-64 bg-gray-100 p-4 shadow-md h-[calc(100vh-4rem)] flex flex-col z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Design</h2>
        <div className="p-1 text-lg">
          <div className="flex space-x-3 mr-1  ">
            <FaTh
              className={`cursor-pointer  hover:bg-gray-400  ${
                !isListView ? "text-black" : "text-gray-900"
              }`}
              onClick={() => setIsListView(false)}
            />
            <FaList
              className={`cursor-pointer  hover:bg-gray-400 ${
                isListView ? "text-black" : "text-gray-600"
              }`}
              onClick={() => setIsListView(true)}
            />
          </div>
        </div>
      </div>
      <hr className=" mt-2 border border-gray-200" />

      <div className="relative mt-2 space-y-4  h-[calc(100vh-16rem)] overflow-y-auto overflow-x-hidden flex-1 z-0">
        {isListView ? <DesignList /> : <DesignGrid />}
      </div>
    </div>
  );
};

export default DesignLeftBar;
