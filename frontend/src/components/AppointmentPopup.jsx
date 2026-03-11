import { useState, useEffect } from "react";
import { createAppointment } from "../services/api";

export default function AppointmentPopup({ modelName, onClose }) {
  const [form, setForm] = useState({
    client_name: "",
    email: "",
    phone: "",
    appointment_date: "",
    interest_model: modelName || "",
    message: ""
  });

  useEffect(() => {
    if (modelName) {
      setForm((prev) => ({ ...prev, interest_model: modelName }));
    }
  }, [modelName]);

  async function submit() {
    console.log("Revisando formulario antes de enviar:", form);

    const { client_name, email, appointment_date, interest_model } = form;

    if (!client_name || !email || !appointment_date || !interest_model) {
      alert(`Faltan campos obligatorios. Modelo detectado: ${interest_model || "NINGUNO"}`);
      return;
    }

    try {
      await createAppointment(form);
      alert("Cita agendada correctamente");
      onClose();
    } catch (error) {
      console.error("Error en la API:", error);
      alert("Error al agendar en el servidor");
    }
  }

  return (
    <div className="popup modern-popup">
      <h3>Agendar Prueba de Manejo</h3>
      <p className="popup-subtitle">{modelName || "Seleccionando modelo..."}</p>

      <div className="popup-field">
        <input
          className="popup-input-round"
          placeholder="Tu nombre completo"
          value={form.client_name}
          onChange={(e) => setForm({ ...form, client_name: e.target.value })}
        />
      </div>

      <div className="popup-field row-flex" style={{ display: "flex", gap: "10px" }}>
        <input
          className="popup-input-round"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="popup-input-round"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="popup-field">
        <label className="input-label">Fecha y hora preferida</label>
        <input
          className="popup-input-round"
          type="datetime-local"
          value={form.appointment_date}
          onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
        />
      </div>

      <div className="popup-field">
        <textarea
          className="popup-input-round"
          placeholder="Mensaje opcional"
          style={{ resize: "none", height: "60px" }}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <div className="popup-actions-row">
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-primary-round" onClick={submit}>Agendar</button>
      </div>
    </div>
  );
}