import React from "react";
import { useNavigate } from "react-router-dom";

interface LeavePopupProps {
  onClose: () => void;
}

const LeavePopup: React.FC<LeavePopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate("/mainPage");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Leave this Portfolio?</h2>
        <p className="mb-2">If you leave the portfolio with the name:</p>
        <p className="font-semibold">My Portfolio</p>
        <p className="text-sm text-gray-600 mb-4">
          You'll lose access to all designs in it.
        </p>

        <div className="flex justify-end gap-4">
          <button
            className="text-gray-500 px-4 py-2 hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 hover:bg-gray-100 hover:text-gray-500  rounded-md cursor-pointer"
            onClick={handleLeave}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePopup;
