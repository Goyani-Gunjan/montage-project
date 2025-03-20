// TopButtons.tsx
import React from "react";
import { FaAlignLeft, FaLayerGroup, FaCube, FaImage } from "react-icons/fa";
import { CanvasButton } from "../components/user/Button";

const TopButtons: React.FC = () => {
  const buttons = [
    {
      icon: <FaImage />,
      label: "2D View",
      onClick: () => console.log("2D Button 1 clicked"),
    },
    {
      icon: <FaCube />,
      label: "3D View",
      onClick: () => console.log("3D Button 2 clicked"),
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
