import Manager from "../../store/Manager";
import Cookies from "js-cookie";
import { fetchPost } from "../../utils/FetchApi";

interface OrderPopupProps {
  onClose: () => void;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ onClose }) => {
  const manager = new Manager();
  const selectedPortfolioId = manager.uiStore.selectedPortfolioId;

  const handleSave = async () => {
    if (!selectedPortfolioId) {
      console.error("No portfolio selected.");
      return;
    }

    const selectedModules = manager.uiStore.selectedModules;
    const model = manager.montageStore.models;
    const moduleArr = selectedModules
      .map((item, index) => {
        return {
          moduleId: item.id,
          locked: model[index].isLocked,
          scale: model[index].scale || [1, 1, 1],
          rotate: model[index].rotation[1],
          position: model[index].position,
        };
      })
      .filter(Boolean);

    const payload = {
      name: manager.uiStore.currentDesignName,
      styleId: 1,
      version: "0.0.1",
      configuredStyle: manager.uiStore.configuredStyle,
      moduleArr: moduleArr,
    };
    console.log(moduleArr);

    try {
      const token = Cookies.get("token");
      const response = await fetchPost(
        `/design?portfolioId=${selectedPortfolioId}`,
        token,
        JSON.stringify(payload)
      );

      if (!response.success) {
        console.error("Error saving design:", response.message);
        alert(response.message);
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

      const stripeCheckoutPayload = {
        designId: designId,
        packageId: "5e489a12-0067-4cf8-be1e-58cd8594e942",
        packageAddonsIds: ["9c515ced-cee4-4ad6-8723-1a747ad367c1"],
        additionalOptIds: [1],
        address: {
          firstName: "John",
          lastName: "Doe",
          phone: "123456789",
          email: "pruthav@hexacoder.com",
        },
      };

      const stripeCheckoutResponse = await fetchPost(
        "/stripe-checkout",
        token,
        JSON.stringify(stripeCheckoutPayload)
      );
      console.log(stripeCheckoutResponse);
      if (!stripeCheckoutResponse.success) {
        console.error(
          "Error creating Stripe checkout session:",
          stripeCheckoutResponse.message
        );
        alert("Failed to create Stripe checkout session. Please try again.");
        return;
      }

      const stripeUrl = stripeCheckoutResponse.data.clientSecret;
      if (stripeUrl) {
        window.open(stripeUrl, "_self");
      } else {
        throw new Error("Stripe URL not found in response!");
      }

      alert("Design saved and details fetched successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Quite without saving ? </h2>
        <hr className=" border border-gray-200" />

        <div className="text-xsm">
          Your change will be lost if you do not save them.{" "}
        </div>
        <hr className=" border border-gray-200" />
        <div className="flex justify-end gap-4 mt-2">
          <button
            className="bg-gray-200 w-30 rounded-md hover:bg-gray-300 px-4 py-2 cursor-pointer"
            onClick={onClose}
          >
            Don't Save
          </button>
          <button
            className="bg-black text-white w-30 px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
