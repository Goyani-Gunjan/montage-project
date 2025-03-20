import {
  FaChevronDown,
  FaEllipsisH,
  FaList,
  FaPlus,
  FaTh,
} from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeavePopup from "./LeavePopup";
import PortFolioGrid from "./PortFolioGrid";
import PortfolioList from "./PortfolioList";
import RenamePopup from "./RenamePopup";
import { Button, GrayButton } from "../user/Button";

const PortFolioMain = observer(() => {
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
          <GrayButton
            label="Grid"
            icon={<FaTh />}
            onClick={() => setView("grid")}
          />
          <GrayButton
            label="List"
            icon={<FaList />}
            onClick={() => setView("list")}
          />
          <GrayButton
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
          <div className="absolute left-36 top-2  bg-white shadow-lg rounded-md w-25 z-50">
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

      {view === "grid" ? <PortFolioGrid /> : <PortfolioList />}

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
});

export default PortFolioMain;
