import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function App() {
  const [message, setMessage] = useState("precio del Yaris 2021");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const res = await fetch(`${API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setAnswer(data.answer || JSON.stringify(data));
  }

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <h2>Chatbot demo</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: 320 }} />
      <button onClick={ask} style={{ marginLeft: 8 }}>Enviar</button>
      <p><b>Respuesta:</b> {answer}</p>
    </div>
  );
}