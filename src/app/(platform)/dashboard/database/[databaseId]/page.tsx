import Bar from "@/components/charts/Bar";
import Bar2 from "@/components/charts/Bar2";
import ChartCard from "@/components/charts/ChartCard";
import ChartCardContainer from "@/components/charts/ChartCardContainer";
import LineChart from "@/components/charts/LineChart";
import { Map } from "@/components/charts/Map";
import { numData, geoData } from "@/components/charts/data";

const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {
  
  
  return (
    <ChartCardContainer>
      <Bar2/>
      <LineChart/>
      <Map width={1080} height={650} geoData={geoData} numData={numData}/>
    </ChartCardContainer>
  );
};

export default OraganizationPage;
