import { Html } from "@react-three/drei";
import { RiFlipHorizontalFill, RiFlipVerticalFill } from "react-icons/ri";
import { BsThreeDots, BsTrash, BsFiles, BsLock } from "react-icons/bs";
import { useState } from "react";
import Manager from "./store/Manager";
import { observer } from "mobx-react";

const HtmlList = observer(({ onFlipHorizontal, onFlipVertical, modelId }) => {
  // Get the singleton instance of Manager
  const manager = Manager.instance;
  const montageStore = manager.montageStore;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDeleteModel = (e) => {
    e.stopPropagation();
    montageStore.deleteModel(modelId);
    setIsDropdownOpen(false);
  };

  const handleDropdownItemClick = (action) => (e) => {
    e.stopPropagation();

    if (action === "Delete") {
      handleDeleteModel(e);
    } else {
      alert(`${action} clicked for model ${modelId}`);
      setIsDropdownOpen(false);
    }
  };

  return (
    <Html position={[0, 10, -3.3]} center>
      <div
        style={{
          display: "flex",
          gap: "8px",
          background: "white",
          padding: "8px",
          borderRadius: "8px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>
          {`
          .custom-button {
            background:rgb(177, 172, 172);
            border: 1px solid darkgray;
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s, border-color 0.3s;
          }
          .custom-button:hover {
            background: #C0C0C0;
            border-color: black;
          }
          .dropdown {
            position: absolute;
            top: 0;
            left: 100%;
            margin-left: 8px;
            background: white;
            color : black ;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: ${isDropdownOpen ? "block" : "none"};
          }
          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            cursor: pointer;
            white-space: nowrap;
          }
          .dropdown-item:hover {
            background: #f0f0f0;
          }
        `}
        </style>

        <button
          className="custom-button"
          onClick={(e) => {
            e.stopPropagation();
            onFlipHorizontal();
          }}
        >
          <RiFlipHorizontalFill size={20} />
        </button>

        <button
          className="custom-button"
          onClick={(e) => {
            e.stopPropagation();
            onFlipVertical();
          }}
        >
          <RiFlipVerticalFill size={20} />
        </button>

        <button className="custom-button" onClick={toggleDropdown}>
          <BsThreeDots size={20} />
        </button>

        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={handleDeleteModel}>
              <BsTrash size={16} />
              <span>Delete</span>
            </div>
            <div
              className="dropdown-item"
              onClick={handleDropdownItemClick("Duplicate")}
            >
              <BsFiles size={16} />
              <span>Duplicate</span>
            </div>
            <div
              className="dropdown-item"
              onClick={handleDropdownItemClick("Lock")}
            >
              <BsLock size={16} />
              <span>Lock</span>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
});

export default HtmlList;
