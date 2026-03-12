import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/big_audi.png";

export default function AdminLayout() {
  const location = useLocation();

  // Función para saber si un link está activo y darle estilo
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="sidebar-logo-container">
          <img src={logo} alt="Audi Logo" className="sidebar-logo" />
        </div>
        
        <h2>Admin </h2>

        <nav className="sidebar-nav">
          <Link to="/admin" className={isActive("/admin")}>
            Dashboard
          </Link>
          
          <Link to="/admin/cars" className={isActive("/admin/cars")}>
            Autos
          </Link>
          
          <Link to="/admin/appointments" className={isActive("/admin/appointments")}>
            Citas
          </Link>
          <Link to="/admin/financing" className={isActive("/admin/financing")}>
            Financiamiento
          </Link>
          <Link to="/admin/newsletter" className={isActive("/admin/newsletter")}>
            Newsletter
          </Link>
        </nav>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}