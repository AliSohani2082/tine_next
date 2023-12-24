import DatabaseForm from "./_components/databaseForm";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex justify-center w-2/3 h-[800px] bg-red-3001">
        <DatabaseForm />
      </div>
    </div>
  );
};

export default DashboardPage;
