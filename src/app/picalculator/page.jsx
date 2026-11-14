import Picalculator from "../components/PI/Picalculator";

export async function generateMetadata() {
  return {
    title: "Eve Helper - PI Calculator",
    description: "Planetary Interaction production chains and profits for EVE Online.",
    alternates: { canonical: "/picalculator" },
    openGraph: {
      title: "PI Calculator - EVE Helper",
      description: "Planetary Interaction production chains and profits for EVE Online.",
      url: "/picalculator",
      type: "website",
    },
    twitter: {
      title: "Eve Helper - PI Calculator",
      description: "Planetary Interaction production chains and profits for EVE Online.",
      card: "summary_large_image",
    },
  };
}

  export default function Calculator() {
    return (
      <>
     
        <Picalculator />
       
      </>
    );
  }