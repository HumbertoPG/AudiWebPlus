import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";

import Models from "./pages/Models";
import CarDetail from "./pages/CarDetail";
import Home from "./pages/Home";

import CarsAdmin from "./admin/CarsAdmin";
// import EditCar from "./admin/EditCar";
// import CreateCar from "./admin/CreateCar";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AppointmentsAdmin from "./admin/AppoinmentsAdmin";
import FinancingAdmin from "./admin/FinancingAdmin"
import NewsletterAdmin from "./admin/NewsletterAdmin";

function Layout() {

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="layout">

      {!isAdmin && <Sidebar />}
      

      <Routes>

        {/* CLIENT ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/models" element={<Models />} />

        <Route path="/models/:id" element={<CarDetail />} />
        <Route path="/used-cars/:id" element={<CarDetail />} />

        {/* ADMIN */}

        <Route path="/admin" element={<AdminLayout/>}>

          <Route index element={<AdminDashboard/>}/>

          <Route path="cars" element={<CarsAdmin/>}/>
          <Route path="appointments" element={<AppointmentsAdmin/>}/>
          <Route path="financing" element={<FinancingAdmin/>}/>
          <Route path="newsletter" element={<NewsletterAdmin/>}/>

          </Route>

      </Routes>
      {!isAdmin && <Chatbot />}

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}