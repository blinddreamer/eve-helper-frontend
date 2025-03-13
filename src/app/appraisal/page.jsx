import AppraisalHome from "../components/Appraisal/AppraisalHome";

export async function generateMetadata({ params }) {
 
  
    // Set the default metadata with a placeholder.
    let metadata = {
      title: "Eve Helper -Appraisals", // Default title.
      description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default description.
      openGraph: {
        title: "Appraisals - EVE Helper", // Default OG title.
        description: "Appraisals - EVE Helper", // Default OG description.
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/appraisal/`,
        type: "website",
      },
    };
  
  
    return metadata;
  }

export default function Appraisal() {
    return (
      <>
     
        <AppraisalHome />
       
      </>
    );
  }