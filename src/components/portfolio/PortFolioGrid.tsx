import { FaEllipsisH } from "react-icons/fa";
const PortFolioGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
        <img
          src="assets/cineapp.png"
          alt="Design Preview"
          className="h-56 w-full border-b border-gray-300"
        />
        <div className="flex justify-between items-center p-3">
          <div>
            <h3 className="text-l font-medium">Model-1</h3>
            <p className="text-sm text-gray-500">3 Modules</p>
          </div>
          <FaEllipsisH className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PortFolioGrid;
