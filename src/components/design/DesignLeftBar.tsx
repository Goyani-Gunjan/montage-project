import { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";
import DesignList from "./DesignList";
import DesignGrid from "./DesignGrid";

type DesignLeftBarProps = {
  handleSidebarChange: (name: string) => void;
};

const DesignLeftBar: React.FC<DesignLeftBarProps> = ({
  handleSidebarChange,
}) => {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="fixed top-[72px] left-[80px] w-80 bg-gray-100 p-4 h-[calc(100vh-4rem)] border-l border-gray-200 flex flex-col z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Design</h2>
        <div className="flex space-x-3 mr-1 p-1 text-lg">
          <FaTh
            className={`cursor-pointer hover:bg-gray-400  ${
              !isListView ? "text-black" : "text-gray-900"
            }`}
            onClick={() => setIsListView(false)}
          />
          <FaList
            className={`cursor-pointer hover:bg-gray-400 ${
              isListView ? "text-black" : "text-gray-600"
            }`}
            onClick={() => setIsListView(true)}
          />
        </div>
      </div>
      <hr className=" mt-2 border border-gray-200" />

      <div className="relative mt-2 space-y-4  h-[calc(100vh-16rem)] overflow-y-auto overflow-x-hidden flex-1 z-0">
        {isListView ? (
          <DesignList />
        ) : (
          <DesignGrid handleSidebarChange={handleSidebarChange} />
        )}
      </div>
    </div>
  );
};

export default DesignLeftBar;
