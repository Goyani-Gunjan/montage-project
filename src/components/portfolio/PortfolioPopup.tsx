import { IoClose } from "react-icons/io5";

const PortfolioPopup = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen: (open: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
          onClick={() => setIsPopupOpen(false)}
        >
          <IoClose size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Create a new Portfolio</h3>
        <input
          type="text"
          placeholder="Portfolio name"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-200 w-30 rounded-md hover:bg-gray-300">
            Clear
          </button>
          <button
            className="px-4 py-2 bg-black text-white w-30 rounded-md hover:bg-gray-700"
            onClick={() => setIsPopupOpen(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPopup;
