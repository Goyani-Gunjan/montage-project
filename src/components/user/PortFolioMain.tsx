import {
  FaPlus,
  FaTh,
  FaList,
  FaChevronDown,
  FaEllipsisH,
} from "react-icons/fa";

import List from "./List";
import Grid from "./Grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import RenamePopup from "./RenamePopup";
import LeavePopup from "./LeavePopup";
const PortFolioMain = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("list");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState<boolean>(false);

  return (
    <main className="flex-1 p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Button
            label="New Design"
            icon={<FaPlus />}
            onClick={() => {
              navigate("/designpage");
            }}
          />
        </div>
        <div className="flex gap-4">
          <Button
            label="Grid"
            icon={<FaTh />}
            onClick={() => setView("grid")}
          />
          <Button
            label="List"
            icon={<FaList />}
            onClick={() => setView("list")}
          />
          <Button
            label="Date Created"
            icon={<FaChevronDown />}
            onClick={() => alert("Sort by Date...")}
          />
        </div>
      </div>

      <div className="relative inline-block">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-5">
          All Designs
          <FaEllipsisH
            className="cursor-pointer mt-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </h2>

        {isDropdownOpen && (
          <div className="absolute left-36 top-2  bg-white shadow-lg rounded-md w-25">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setIsRenameOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Rename
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => {
                setIsLeaveOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Leave
            </button>
          </div>
        )}
      </div>

      {view === "grid" ? <Grid /> : <List />}

      <button
        className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 fixed bottom-6 right-6 shadow-lg cursor-pointer"
        onClick={() => {
          navigate("/designPage");
        }}
      >
        <FaPlus /> Start Designing
      </button>

      {isRenameOpen && <RenamePopup onClose={() => setIsRenameOpen(false)} />}
      {isLeaveOpen && <LeavePopup onClose={() => setIsLeaveOpen(false)} />}
    </main>
  );
};

export default PortFolioMain;
