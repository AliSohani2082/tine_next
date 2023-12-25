import Navbar from "./_components/Navbar/Navbar";
import Sidebar from "./_components/Sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed flex flex-row items-stretch justify-stretch w-full h-screen">
      <div className="flex flex-col justify-start items-stretch w-full h-full">
        <Navbar />
        <div className="h-full flex items-stretch justify-stretch overflow-auto">
          {children}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
