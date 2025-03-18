import { Html } from "@react-three/drei";
import { RiFlipHorizontalFill, RiFlipVerticalFill } from "react-icons/ri";
import { BsThreeDots, BsTrash, BsFiles, BsLock } from "react-icons/bs";
import { useState } from "react";
import Manager from "./store/Manager";
import { observer } from "mobx-react";

enum DropdownAction {
  Delete = "Delete",
  Duplicate = "Duplicate",
  Lock = "Lock",
}

const manager = new Manager();

interface HtmlListProps {
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  modelId: string;
}

const HtmlList = observer(
  ({ onFlipHorizontal, onFlipVertical, modelId }: HtmlListProps) => {
    const montageStore = manager.montageStore;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = (e: React.PointerEvent) => {
      e.stopPropagation();
      setIsDropdownOpen((prev) => !prev);
    };

    const handleDropdownAction =
      (action: DropdownAction) => (e: React.PointerEvent) => {
        e.stopPropagation();

        switch (action) {
          case DropdownAction.Delete:
            montageStore.deleteModel(modelId);
            break;
          case DropdownAction.Duplicate:
            montageStore.duplicateModel(modelId);
            break;
          case DropdownAction.Lock:
            alert(`Lock clicked for model ${modelId}`);
            break;
          default:
            console.warn(`Unknown action: ${action}`);
        }

        setIsDropdownOpen(false);
      };

    const styles = {
      container: {
        display: "flex",
        gap: "8px",
        background: "white",
        padding: "8px",
        borderRadius: "8px",
        position: "relative",
      },
      customButton: {
        background: "rgb(177, 172, 172)",
        border: "1px solid darkgray",
        padding: "5px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.3s, border-color 0.3s",
      },
      customButtonHover: {
        background: "#C0C0C0",
        borderColor: "black",
      },
      dropdown: {
        position: "absolute",
        top: "0",
        left: "100%",
        marginLeft: "8px",
        background: "white",
        color: "black",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 10000,
        display: isDropdownOpen ? "block" : "none",
      },
      dropdownItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      },
      dropdownItemHover: {
        background: "#f0f0f0",
      },
    };

    return (
      <Html position={[0, 10, -3.3]} center>
        <div style={styles.container} onClick={(e) => e.stopPropagation()}>
          <button
            style={styles.customButton}
            onClick={(e) => {
              e.stopPropagation();
              onFlipHorizontal();
            }}
          >
            <RiFlipHorizontalFill size={20} />
          </button>

          <button
            style={styles.customButton}
            onClick={(e) => {
              e.stopPropagation();
              onFlipVertical();
            }}
          >
            <RiFlipVerticalFill size={20} />
          </button>

          <button style={styles.customButton} onClick={toggleDropdown}>
            <BsThreeDots size={20} />
          </button>

          {isDropdownOpen && (
            <div style={styles.dropdown}>
              <div
                style={styles.dropdownItem}
                onClick={handleDropdownAction(DropdownAction.Delete)}
              >
                <BsTrash size={16} />
                <span>Delete</span>
              </div>
              <div
                style={styles.dropdownItem}
                onClick={handleDropdownAction(DropdownAction.Duplicate)}
              >
                <BsFiles size={16} />
                <span>Duplicate</span>
              </div>
              <div
                style={styles.dropdownItem}
                onClick={handleDropdownAction(DropdownAction.Lock)}
              >
                <BsLock size={16} />
                <span>Lock</span>
              </div>
            </div>
          )}
        </div>
      </Html>
    );
  }
);

export default HtmlList;
