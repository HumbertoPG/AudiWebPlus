import { useEffect, useState } from "react";
import { getFinancingRequests, deleteFinancingRequest } from "../services/api";

export default function FinancingAdmin() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getFinancingRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(id) {
    if(!confirm("¿Borrar solicitud?")) return;
    try {
      await deleteFinancingRequest(id);
      load(); // Recargamos la lista
    } catch (error) {
      alert("Error al borrar");
    }
  }

  return (
    <div className="admin-container">
      <h2 style={{ 
            marginBottom: "30px",
            marginTop: "20px",
        }}>Panel de Financiamiento</h2>
      <div className="table-wrapper">
        <table className="admin-table-full">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Cliente</th>
              <th style={{ textAlign: "left" }}>Modelo</th>
              <th style={{ textAlign: "left" }}>Contacto</th>
              <th style={{ textAlign: "left" }}>Mensaje</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id_financing}>
                <td className="bold-text">{r.client_name}</td>
                <td>{r.interest_model}</td>
                <td>
                  <div style={{fontSize: '0.85em'}}>
                    {r.email}<br/>
                    <span style={{color: '#666'}}>{r.phone}</span>
                  </div>
                </td>
                <td style={{ maxWidth: '250px', fontSize: '0.85em' }}>{r.message}</td>
                <td className="table-actions-right">
                  <a href={`mailto:${r.email}`} className="link-edit" style={{textDecoration: 'none'}}>Responder</a>
                  <button onClick={() => remove(r.id_financing)} className="link-delete">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}