import { useState } from "react";

import PortfolioLeftbar from "../portfolio/PortfolioLeftbar";
import PortfolioNavbar from "../portfolio/PortfolioNavbar";

import PortfolioPopup from "../portfolio/PortfolioPopup";

import PortFolioMain from "../portfolio/PortFolioMain";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <PortfolioNavbar />
      <div className="flex flex-grow">
        <PortfolioLeftbar setIsPopupOpen={setIsPopupOpen} />
        <PortFolioMain />
      </div>
      {isPopupOpen && <PortfolioPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default MainPage;
