import React, { useState } from "react";

import PortfolioLeftbar from "./PortfolioLeftbar";
import FirstNavbar from "./FirstNavbar";

import PortfolioPopup from "./PortfolioPopup";
import PortFolioMain from "./PortFolioMain";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <FirstNavbar />
      <div className="flex flex-grow">
        <PortfolioLeftbar setIsPopupOpen={setIsPopupOpen} />
        <PortFolioMain />
      </div>
      {isPopupOpen && <PortfolioPopup setIsPopupOpen={setIsPopupOpen} />}
    </div>
  );
};

export default MainPage;
