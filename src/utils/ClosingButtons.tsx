import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RightSidebarButton, SidebarButton } from "./Button";

interface ClosingButtonsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface RightBarToggleButtonProps {
  isRightBarOpen: boolean;
  toggleRightBar: () => void;
}

export const ClosingButtons = ({
  isSidebarOpen,
  toggleSidebar,
}: ClosingButtonsProps) => {
  return (
    <>
      <div
        className={`absolute bottom-20 ${
          isSidebarOpen ? "left-90" : "left-8"
        } z-10`}
      >
        <SidebarButton
          label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          icon={isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
          onClick={toggleSidebar}
        />
      </div>
    </>
  );
};

export const RightBarToggleButton = ({
  isRightBarOpen,
  toggleRightBar,
}: RightBarToggleButtonProps) => {
  return (
    <div
      className={`absolute bottom-20 ${
        isRightBarOpen ? "right-90" : "right-8"
      } z-10`}
    >
      <RightSidebarButton
        label={isRightBarOpen ? "Close Sidebar" : "Open Sidebar"}
        icon={isRightBarOpen ? <FaArrowRight /> : <FaArrowLeft />}
        onClick={toggleRightBar}
      />
    </div>
  );
};
