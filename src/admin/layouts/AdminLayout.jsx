import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import NavbarAdmin from "../components/NavBarAdmin";

function AdminLayout() {
  return (
    <div className="d-flex">
      <SidebarAdmin />

      <main className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
        <NavbarAdmin />

        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
