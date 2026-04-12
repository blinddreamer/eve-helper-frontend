import MarketHome from "../components/Market/MarketHome";

export async function generateMetadata() {
  return {
    title: "Eve Helper - Market Browser",
    description: "Browse EVE Online live market orders and price history for any item across all major trade hubs.",
    openGraph: {
      title: "Market Browser - EVE Helper",
      description: "Browse EVE Online live market orders and price history for any item across all major trade hubs.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/market/`,
      type: "website",
    },
    twitter: {
      title: "Eve Helper - Market Browser",
      description: "Browse EVE Online live market orders and price history.",
      card: "summary_large_image",
    },
  };
}

export default function Market() {
  return <MarketHome />;
}
