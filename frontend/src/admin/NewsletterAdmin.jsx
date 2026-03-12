import { useEffect, useState } from "react";
import { getNewsletterEmails, deleteNewsletterEmail } from "../services/api";

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getNewsletterEmails();
      setSubscribers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este suscriptor de la lista?")) return;
    try {
      await deleteNewsletterEmail(id);
      load(); // Recargamos la tabla
    } catch (error) {
      alert("No se pudo eliminar");
    }
  }

  return (
    <div className="admin-container">
      <h2 style={{ 
            marginBottom: "30px",
            marginTop: "20px",
        }}>Correos suscritos</h2>
      <div className="table-wrapper">
        <table className="admin-table-full">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Correo Electrónico</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id_subscriber}> 
                <td className="bold-text">{s.email}</td>
                <td className="table-actions-right">
                   <button 
                    onClick={() => handleDelete(s.id_subscriber)} 
                    className="link-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}