import { observer } from "mobx-react";
import { FaSave } from "react-icons/fa";
import { fetchPost } from "../../utils/FetchApi";
import Cookies from "js-cookie";
import Manager from "../../store/Manager";

const Navbar = observer(() => {
  const manager = new Manager();
  const selectedPortfolioId = manager.uiStore.selectedPortfolioId;
  const portfolios = manager.uiStore.portfolios;

  const selectedPortfolio = portfolios.find(
    (portfolio) => portfolio.id == selectedPortfolioId
  );

  const portfolioName = selectedPortfolio
    ? selectedPortfolio.name
    : "my portfolio";

  const handleSave = async () => {
    if (!selectedPortfolioId) {
      console.error("No portfolio selected.");
      return;
    }

    const payload = {
      name: manager.uiStore.currentDesignName,
      styleId: 1,
      version: "0.0.1",
      configuredStyle: manager.uiStore.configuredStyle,
      moduleArr: [
        {
          moduleId: 1,
          lock: true,
          scale: [1, 2],
          rotate: [90, 45],
        },
        {
          moduleId: 1,
          lock: true,
          scale: [1, 2],
          rotate: [90, 45],
        },
        {
          moduleId: 1,
          lock: true,
          scale: [1, 2],
          rotate: [90, 45],
        },
      ],
    };

    try {
      const token = Cookies.get("token");
      const response = await fetchPost(
        `/design?portfolioId=${selectedPortfolioId}`,
        token,
        JSON.stringify(payload)
      );

      if (!response.success) {
        console.error("Error saving design:", response.message);
        alert("Failed to save design. Please try again.");
        return;
      }

      const designData = response.data;
      console.log("Design saved successfully:", designData);

      const designId = designData?.id;
      if (!designId) {
        throw new Error("Design ID not found in response!");
      }

      const portfolioDesignResponse = await fetchPost(
        `/portfolio/${selectedPortfolioId}/design`,
        token,
        JSON.stringify({ designIds: [designId] })
      );

      if (!portfolioDesignResponse.success) {
        console.error(
          "Error fetching design details:",
          portfolioDesignResponse.message
        );
        alert("Failed to fetch design details. Please try again.");
        return;
      }

      const portfolioDesignData = portfolioDesignResponse.data;
      console.log("Design details fetched successfully:", portfolioDesignData);

      alert("Design saved and details fetched successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-md bg-white z-10">
      <div className="flex items-center space-x-5">
        <div className="font-semibold text-lg">Montage</div>
        <button className="text-xl cursor-pointer" onClick={handleSave}>
          <FaSave />
        </button>
        <span className="font-semibold">{portfolioName}</span>
        <span>|</span>
        <input
          type="text"
          placeholder="Design Name"
          value={manager.uiStore.currentDesignName}
          onChange={(e) => manager.uiStore.setCurrentDesignName(e.target.value)}
          className="  p-1 "
        />
      </div>
      <div className="space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded">Share</button>
        <button className="bg-gray-200 px-4 py-2 rounded">View Plans</button>
      </div>
    </div>
  );
});

export default Navbar;
