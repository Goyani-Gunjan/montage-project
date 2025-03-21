import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SidebarButton } from "../components/user/Button";

interface ClosingButtonsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const ClosingButtons = ({
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

export default ClosingButtons;
