// TopButtons.tsx
import React from "react";
import { FaAlignLeft, FaLayerGroup, FaCube, FaImage } from "react-icons/fa";
import { CanvasButton } from "./Button";
import Manager from "../store/Manager";

const TopButtons: React.FC = () => {
  const manager = new Manager();
  const buttons = [
    {
      icon: <FaImage />,
      label: "2D View",
      onClick: () => manager.montageStore.toggle3D(false),
    },
    {
      icon: <FaCube />,
      label: "3D View",
      onClick: () => manager.montageStore.toggle3D(true),
    },
    {
      icon: <FaLayerGroup />,
      label: "Interior image",
      onClick: () => console.log("3D Button 2 clicked"),
    },
    {
      icon: <FaAlignLeft />,
      label: "Edit",
      onClick: () => console.log("3D Button 2 clicked"),
    },
  ];

  return (
    <div className="flex  gap-1">
      {buttons.map((button, index) => (
        <CanvasButton
          key={index}
          icon={button.icon}
          label={button.label}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

export default TopButtons;
