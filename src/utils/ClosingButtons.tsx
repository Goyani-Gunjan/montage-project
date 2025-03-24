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
        } z-10 transition-all duration-300`}
      >
        <SidebarButton
          label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          icon={
            <span className="transition-transform duration-300">
              {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
            </span>
          }
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
      } z-10 transition-all duration-300`}
    >
      <RightSidebarButton
        label={isRightBarOpen ? "Close Sidebar" : "Open Sidebar"}
        icon={
          <span className="transition-transform duration-300">
            {isRightBarOpen ? <FaArrowRight /> : <FaArrowLeft />}
          </span>
        }
        onClick={toggleRightBar}
      />
    </div>
  );
};
