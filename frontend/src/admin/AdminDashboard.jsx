import { useEffect, useState } from "react";
import { getCars, getAppointments, getUsedCars, getFinancingRequests } from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    newCars: 0, 
    usedCars: 0, 
    totalInventory: 0,
    appointments: 0, 
    financing: 0,
    totalLeads: 0,
    conversion: 0 
  });

  useEffect(() => {
    Promise.all([
      getCars(), 
      getUsedCars(), 
      getAppointments(), 
      getFinancingRequests()
    ])
      .then(([newCars, usedCars, apps, finance]) => {
        const totalInv = newCars.length + usedCars.length;
        const totalLds = apps.length + finance.length;
        const convRate = totalInv > 0 ? ((totalLds / totalInv) * 100).toFixed(1) : 0;

        setStats({ 
          newCars: newCars.length, 
          usedCars: usedCars.length,
          totalInventory: totalInv,
          appointments: apps.length, 
          financing: finance.length,
          totalLeads: totalLds,
          conversion: convRate
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="admin-container">
      <header className="dashboard-header">
        <h1>Dashboard General</h1>
        <p>Resumen operativo de Audi Center Angelópolis</p>
      </header>

      <div className="admin-stats-grid-3x3">
        {/* FILA 1: INVENTARIO */}
        <div className="stat-card">
          <span className="stat-label">Autos Nuevos</span>
          <span className="stat-value">{stats.newCars}</span>
          <div className="stat-bar" style={{ width: '100%', background: '#000' }}></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Seminuevos</span>
          <span className="stat-value">{stats.usedCars}</span>
          <div className="stat-bar" style={{ width: '100%', background: '#666' }}></div>
        </div>
        <div className="stat-card dark-card">
          <span className="stat-label">Total Unidades</span>
          <span className="stat-value">{stats.totalInventory}</span>
          <span className="stat-footer">Stock disponible</span>
        </div>

        {/* FILA 2: LEADS / CONTACTO */}
        <div className="stat-card">
          <span className="stat-label">Citas Agendadas</span>
          <span className="stat-value">{stats.appointments}</span>
          <div className="stat-bar" style={{ width: '100%', background: '#d4af37' }}></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Financiamientos</span>
          <span className="stat-value">{stats.financing}</span>
          <div className="stat-bar" style={{ width: '100%', background: '#d4af37' }}></div>
        </div>
        <div className="stat-card gold-card">
          <span className="stat-label">Total Leads</span>
          <span className="stat-value">{stats.totalLeads}</span>
          <span className="stat-footer">Interesados totales</span>
        </div>

        {/* FILA 3: RENDIMIENTO */}
        <div className="stat-card full-row-mobile">
          <span className="stat-label">Tasa de Conversión</span>
          <span className="stat-value">{stats.conversion}%</span>
          <span className="stat-footer">Leads vs Inventario</span>
        </div>
        {/* Puedes dejar espacios vacíos o agregar más métricas aquí */}
        <div className="stat-card empty-card">
           <span className="stat-label">Status Sistema</span>
           <span className="stat-value" style={{fontSize: '18px', color: '#28a745'}}>● Online</span>
        </div>
        <div className="stat-card empty-card">
           <span className="stat-label">Ubicación</span>
           <span className="stat-value" style={{fontSize: '18px'}}>Angelópolis</span>
        </div>
      </div>
    </div>
  );
}