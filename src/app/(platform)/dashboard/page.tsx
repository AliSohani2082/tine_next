import DatabaseForm from "./_components/databaseForm";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full h-full px-20 py-7">
        <DatabaseForm />
      </div>
    </div>
  );
};

export default DashboardPage;
