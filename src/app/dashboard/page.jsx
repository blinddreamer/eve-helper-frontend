import DashboardHome  from "../components/CharacterInfo/DashboardHome";
export async function generateMetadata() {
  return {
    title: "Eve Helper - Dashboard",
    description: "Your EVE Online characters and wallet balances.",
    alternates: { canonical: "/dashboard" },
    // personal page: nothing to index
    robots: { index: false },
  };
}


export default function Dashboard() {
  return (
    <>
   
      <DashboardHome />
     
    </>
  );
}