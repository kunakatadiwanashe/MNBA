


import Banner from "@/components/Banner";
import ResultsPage from "./(pages)/results/page";
import FixturesPage from "./(pages)/fixture/page";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">

      <Banner />


      <div className="flex flex-col lg:flex-row w-full gap-6 px-4 py-6">

        <div className="w-full lg:w-1/2">
          <FixturesPage />
        </div>
        
        <div className="w-full lg:w-1/2">
          <ResultsPage />
        </div>



      </div>



    </div>
  );
}
