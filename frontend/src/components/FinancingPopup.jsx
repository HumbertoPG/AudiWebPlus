import { useState } from "react";
import { requestFinancing } from "../services/api";

export default function FinancingPopup({ modelName, onClose }) {
  const [form, setForm] = useState({
    client_name: "",
    email: "",
    phone: "",
    interest_model: modelName || "",
    message: ""
  });

  async function submit() {
    if(!form.client_name || !form.email) return alert("Por favor llena los campos básicos");
    try {
      await requestFinancing(form);
      alert("Solicitud enviada");
      onClose();
    } catch {
      console.log("Error al enviar");
    }
  }

  return (
    <div className="popup modern-popup">
      <h3>Solicitar Financiamiento</h3>
      <p className="popup-subtitle">{modelName}</p>

      <div className="popup-field">
        <input
          className="popup-input-round"
          placeholder="Nombre completo"
          value={form.client_name}
          onChange={e => setForm({ ...form, client_name: e.target.value })}
        />
      </div>

      <div className="popup-field">
        <input
          className="popup-input-round"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="popup-field">
        <input
          className="popup-input-round"
          placeholder="Teléfono"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="popup-actions-row">
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        <button className="btn-primary-round" onClick={submit}>Enviar</button>
      </div>
    </div>
  );
}