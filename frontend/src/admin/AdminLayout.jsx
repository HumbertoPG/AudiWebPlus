import { Link, Outlet } from "react-router-dom";
import logo from "../assets/big_audi.png";

export default function AdminLayout(){

return(

<div className="layout">

<div className="sidebar">

<h2>Admin</h2>

<div className="sidebar-logo-container">
<img src={logo} alt="Audi Logo" className="sidebar-logo" />
</div>

<Link to="/admin">Dashboard</Link>
<Link to="/admin/cars">Autos</Link>
<Link to="/admin/appointments">Citas</Link>

</div>

<div className="admin-content">

<Outlet/>

</div>

</div>

)

}