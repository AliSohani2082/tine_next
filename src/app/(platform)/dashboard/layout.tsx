import Navbar from "./_components/Navbar/Navbar";
import Sidebar from "./_components/Sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed flex flex-row items-stretch justify-stretch w-full h-full">
      <div className="flex w-full flex-col items-stretch justify-start">
        <Navbar />
        {children}
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
