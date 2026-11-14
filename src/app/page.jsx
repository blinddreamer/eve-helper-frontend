// pages/index.js

import Homepage from "./components/Homepage";

export async function generateMetadata({ params }) {
  // Set the default metadata with a placeholder.
  let metadata = {
    title: "Eve Helper - Industry Calculator/Appraisal", // Default title.
    description:
      "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default description.
    alternates: { canonical: "/" },
    openGraph: {
      title: "EVE Helper - Industry Calculator/Appraisal", // Default OG title.
      description:
        "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.", // Default OG description.
      url: "/",
      type: "website",
    },
    twitter: {
      title: "EVE Helper - Industry Calculator/Appraisal",
      description: "EVE Helper provides industrial calculation tools for EVE Online, including market appraisals and profit calculators.",
      card: "summary_large_image",
      }
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
