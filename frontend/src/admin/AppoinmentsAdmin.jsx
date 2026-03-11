import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

export default function AppoinmentsAdmin() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2>Citas agendadas</h2>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Modelo</th>
            <th>Mensaje</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <tr key={item.id_appointment}>
              <td>{item.client_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.appointment_date}</td>
              <td>{item.interest_model}</td>
              <td>{item.message}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}