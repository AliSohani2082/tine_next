import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "./_components/Navbar/Navbar";
import Sidebar from "./_components/Sidebar/Sidebar";
import Slider from "./_components/Slider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed flex flex-row items-stretch justify-stretch w-full h-screen font-mono">
      <div className="flex flex-col justify-start items-stretch w-full h-full">
        <Navbar />
        {children}
        <Slider/>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
