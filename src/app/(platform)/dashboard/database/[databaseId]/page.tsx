import StepModal from "@/components/shared/StepperModal";

const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {
  return <div>this is database: {params.databaseId}</div>;
};

export default OraganizationPage;
