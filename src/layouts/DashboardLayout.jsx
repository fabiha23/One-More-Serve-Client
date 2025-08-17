import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative h-screen lg:flex bg-base-200 overflow-hidden">
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-5 min-h-full">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
