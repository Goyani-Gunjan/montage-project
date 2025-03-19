import { useState } from "react";
import PortfolioNavbar from "../portfolio/PortfolioNavbar";

import PortfolioPopup from "../portfolio/PortfolioPopup";

import PortFolioMain from "../portfolio/PortFolioMain";
import PortfolioLeftBar from "../portfolio/PortfolioLeftbar";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <PortfolioNavbar />
      <div className="flex flex-grow">
        <PortfolioLeftBar setIsPopupOpen={setIsPopupOpen} />
        <PortFolioMain />
      </div>
      {isPopupOpen && <PortfolioPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default MainPage;
