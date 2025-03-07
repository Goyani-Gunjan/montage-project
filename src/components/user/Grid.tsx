import { FaEllipsisH } from "react-icons/fa";
const Grid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 relative">
        <img
          src="assets/cineapp.png"
          alt="Design Preview"
          className="w-full h-60"
        />
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-lg font-medium">Model-1</h3>
          <FaEllipsisH className="cursor-pointer mt-2" />
        </div>
        <p className="text-gray-500">3 Modules</p>
      </div>
    </div>
  );
};

export default Grid;
