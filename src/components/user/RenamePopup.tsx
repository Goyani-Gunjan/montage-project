interface RenamePopupProps {
  onClose: () => void;
}

const RenamePopup: React.FC<RenamePopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Rename your Portfolio</h2>
        <input
          type="text"
          className="w-full border p-2 rounded-md mb-4"
          placeholder="Enter new name"
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-200 w-30 rounded-md hover:bg-gray-300 px-4 py-2 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white w-30 px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenamePopup;
