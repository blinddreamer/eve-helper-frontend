// pages/index.js

import Homepage from "./components/Homepage";

export async function generateMetadata({ params }) {
 
  
  // Set the default metadata with a placeholder.
  let metadata = {
    title: "EVE Helper - Industry Calculator/Appraisal", // Default title.
    description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default description.
    openGraph: {
      title: "EVE Helper - Industry Calculator/Appraisal", // Default OG title.
      description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default OG description.
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      type: "website",
    },
  };


  return metadata;
}
export default function Home() {
  return (
    <>
  
    <Homepage />
   
    </>
  );
}