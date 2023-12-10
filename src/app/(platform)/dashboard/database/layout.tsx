import Sidebar from "../_components/Sidebar";

const organizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7 justify-between h-screen mb-4">
        {children}
      </div>
    </main>
  );
};

export default organizationLayout;
