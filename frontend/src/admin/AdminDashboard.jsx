import { useEffect, useState } from "react";
import { getCars, getAppointments } from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cars: 0, appointments: 0 });

  useEffect(() => {
    Promise.all([getCars(), getAppointments()])
      .then(([cars, apps]) => {
        setStats({ cars: cars.length, appointments: apps.length });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="admin-container">
      <h1>Panel Administrador</h1>
      <p>Métricas generales de Audi Center Angelópolis.</p>

      <div className="admin-stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.cars}</span>
          <span className="stat-label">Modelos en Inventario</span>
          <div className="stat-bar" style={{ width: '70%', background: '#000' }}></div>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.appointments}</span>
          <span className="stat-label">Citas Agendadas</span>
          <div className="stat-bar" style={{ width: '45%', background: '#d4af37' }}></div>
        </div>
      </div>
    </div>
  );
}