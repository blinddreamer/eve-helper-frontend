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
function formatPrice(price) {
  if (price >= 1e9) {
    return (price / 1e9).toFixed(1) + "B"; // Convert to billion and add "B"
  } else if (price >= 1e6) {
    return (price / 1e6).toFixed(1) + "M"; // Convert to million and add "M"
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(1) + "K"; // Convert to thousand and add "K"
  } else {
    return price.toFixed(0); // Otherwise, return as it is
  }
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
    twitter: {
      title: "Appraisal - EVE Helper",
      description: "Check out this appraisal!",
      card: "summary_large_image",
      }
  };

  try {
    // Fetch appraisal data from the backend using the uuid.
    const response = await axios.get(`${backend}appraisal/${uuid}`);

    if (response.status === 200) {
      const appraisal = response.data;
      // Update metadata with fetched data.
      const title = `${appraisal.pricePercentage}% ${getMarketName(appraisal.market) || "Unknown Market"} ${appraisal.transactionType}: ${appraisal.transactionType === "split"
            ? formatPrice(appraisal.appraisalResult?.estimateTotalSplit)
            : appraisal.transactionType === "sell"
            ? formatPrice(appraisal.appraisalResult?.estimateTotalSell)
            : formatPrice(appraisal.appraisalResult?.estimateTotalBuy)} ISK`;
      const description = appraisal.appraisalResult?.appraisals
      ?.map(res => `${res.item}: ${appraisal.transactionType === "split" ? formatPrice(res.splitPrice) : appraisal.transactionType === "buy" ? formatPrice(res.buyOrderPrice) : formatPrice(res.sellOrderPrice)} \n`)
      ?.join(";") ||  "No items available"; // Avoids potential undefined issues
    
    metadata = {
      title: title, // Dynamic title
      description: description, // Dynamic description
      openGraph: {
        title: title, // Updated OG title
        description: description, // No need for `{description}`, just use the variable
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/appraisal/${uuid}`,
        type: "website",
      },
      twitter: {
        title: title,
        description: description,
        card: "summary_large_image",
        }
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
