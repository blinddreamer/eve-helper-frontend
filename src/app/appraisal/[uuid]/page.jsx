import AppraisalHome from "@/app/components/Appraisal/AppraisalHome";
import axios from "axios";

// generateMetadata function updates the metadata dynamically for SEO purposes.
export async function generateMetadata({ params }) {
  // Await params to correctly get the uuid.
  const { uuid } = await params;
  function getMarketName(marketId) {
    const marketMap = {
        "10000002_60003760": "Jita",
        "10000043_60008494": "Amarr", // Fixed spelling
        "10000030_60004588": "Rens",
        "10000032_60011866": "Dodixie",
        "10000042_60005686": "Hek"
    };

    return marketMap[marketId] || "Unknown Market";
}
  const backend = process.env.NEXT_PUBLIC_API_URL;

  // Set the default metadata with a placeholder.
  let metadata = {
    title: "Appraisal - EVE Helper", // Default title.
    description: "Check out this appraisal!", // Default description.
    openGraph: {
      title: "Appraisal - EVE Helper", // Default OG title.
      description: "Check out this appraisal!", // Default OG description.
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/appraisal/${uuid}`,
      type: "website",
    },
  };

  try {
    // Fetch appraisal data from the backend using the uuid.
    const response = await axios.get(`${backend}appraisal/${uuid}`);

    if (response.status === 200) {
      const appraisal = response.data;
      // Update metadata with fetched data.
      const description = appraisal.appraisalResult?.appraisals
      ?.map(res => `${res.item}: ${appraisal.transactionType === "split" ? res.splitPrice : appraisal.transactionType === "buy" ? res.buyOrderPrice : res.sellOrderPrice}`)
      ?.join("<br>") ||  "No items available"; // Avoids potential undefined issues
    
    metadata = {
      title: `${appraisal.system} ${appraisal.pricePercentage}% - ${appraisal.market}`, // Dynamic title
      description: `Appraisal ${appraisal.uuid} @ ${appraisal.pricePercentage}% - ${appraisal.market}`, // Dynamic description
      openGraph: {
        title: `${appraisal.pricePercentage}% ${getMarketName(appraisal.market) || "Unknown Market"} ${appraisal.transactionType}: 
          ${appraisal.transactionType === "split"
            ? appraisal.appraisalResult?.estimateTotalSplit
            : appraisal.transactionType === "sell"
            ? appraisal.appraisalResult?.estimateTotalSell
            : appraisal.appraisalResult?.estimateTotalBuy} ISK`, // Updated OG title
        description, // No need for `{description}`, just use the variable
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/appraisal/${uuid}`,
        type: "website",
      },
    };
    }
  } catch (error) {
    console.error("Failed to fetch appraisal:", error);
  }

  return metadata;
}

export default function AppraisalPage({ params }) {
  return <AppraisalHome />;
}
