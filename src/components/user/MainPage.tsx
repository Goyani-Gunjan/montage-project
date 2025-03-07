import React, { useState } from "react";
import {
  FaPlus,
  FaTh,
  FaList,
  FaChevronDown,
  FaEllipsisH,
} from "react-icons/fa";

import PortfolioLeftbar from "./PortfolioLeftbar";
import FirstNavbar from "./FirstNavbar";
// import Grid from "./Grid";
import List from "./List";
import Grid from "./Grid";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("list");
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
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-5">
        All Designs <FaEllipsisH className="cursor-pointer mt-2" />
      </h2>

      {view === "grid" ? <Grid /> : <List />}

      <button
        className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 fixed bottom-6 right-6 shadow-lg cursor-pointer"
        onClick={() => {
          navigate("/designPage");
        }}
      >
        <FaPlus /> Start Designing
      </button>
    </main>
  );
};

const MainPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <FirstNavbar />
      <div className="flex flex-grow">
        <PortfolioLeftbar />
        <MainContent />
      </div>
    </div>
  );
};

export default MainPage;
