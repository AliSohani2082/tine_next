import DatabaseForm from "./_components/DatabaseForm/databaseForm";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <main className="relative w-full h-full p-16">
      <DatabaseForm />
    </main>
  );
};

export default DashboardPage;
