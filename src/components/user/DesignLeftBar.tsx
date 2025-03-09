import { FaList, FaTh } from "react-icons/fa";

const DesignLeftBar = () => {
  return (
    <div className="fixed top-16 w-64 bg-white p-4 shadow-md h-[calc(100vh-4rem)] mt-3 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Design</h2>
        <div className="flex space-x-2">
          <FaTh className="text-gray-600 cursor-pointer" />
          <FaList className="text-gray-600 cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 space-y-4 overflow-y-auto flex-1">
        <div className="w-full h-24 bg-gray-200 rounded"></div>
        <div className="w-full h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default DesignLeftBar;
