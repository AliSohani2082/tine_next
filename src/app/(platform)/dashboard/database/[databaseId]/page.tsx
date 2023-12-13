import { TabsContent } from "@/components/ui/tabs";

const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {
  return (
    <TabsContent value="general">database: {params.databaseId}</TabsContent>
  );
};

export default OraganizationPage;
