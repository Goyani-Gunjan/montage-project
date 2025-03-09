import { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";
import DesignList from "./DesignList";
import DesignGrid from "./DesignGrid";

const DesignLeftBar = () => {
  const [isListView, setIsListView] = useState(false); // Track view state

  return (
    <div className="fixed top-16 w-64 bg-white p-4 shadow-md h-[calc(100vh-4rem)] mt-3 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Design</h2>
        <div className="flex space-x-2">
          <FaTh
            className={`cursor-pointer ${
              !isListView ? "text-black" : "text-gray-600"
            }`}
            onClick={() => setIsListView(false)}
          />
          <FaList
            className={`cursor-pointer ${
              isListView ? "text-black" : "text-gray-600"
            }`}
            onClick={() => setIsListView(true)}
          />
        </div>
      </div>

      <div className="mt-4 space-y-4 overflow-y-auto flex-1">
        {isListView ? <DesignList /> : <DesignGrid />}
      </div>
    </div>
  );
};

export default DesignLeftBar;
