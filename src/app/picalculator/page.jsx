import Picalculator from "../components/PI/Picalculator";

export async function generateMetadata({ params }) {
 
  
    // Set the default metadata with a placeholder.
    let metadata = {
      title: "Eve Helper - Industry Calculator", // Default title.
      description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default description.
      openGraph: {
        title: "Industry Calculator - EVE Helper", // Default OG title.
        description: "Industry Calculator - EVE Helper", // Default OG description.
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/calculator/`,
        type: "website",
      },
      twitter: {
        title: "Eve Helper - Industry Calculator",
        description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.",
        card: "summary_large_image",
        }
    };
  
  
    return metadata;
  }

  export default function Calculator() {
    return (
      <>
     
        <Picalculator />
       
      </>
    );
  }