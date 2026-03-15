import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {

  return (
    <div>

      <Navbar />

      <div style={{padding:"20px"}}>
        <Outlet />
      </div>

    </div>
  );

}

export default DashboardLayout;