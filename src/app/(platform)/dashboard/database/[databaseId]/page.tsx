const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {
  return <div>database: {params.databaseId}</div>;
};

export default OraganizationPage;
