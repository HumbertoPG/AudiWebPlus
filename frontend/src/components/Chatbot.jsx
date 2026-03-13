import { useState, useEffect, useRef } from "react";
import { sendChat } from "../services/api";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola, Soy tu asistente Audi. ¿En qué puedo ayudarte?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function send() {
    if (!message.trim() || loading) return;

    const userMessage = { role: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      // Enviamos el objeto que el controlador espera: { message: "..." }
      const res = await sendChat(userMessage.text);
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.answer || "He procesado tu solicitud." }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Lo siento, mi sistema de inteligencia está en mantenimiento. Inténtalo más tarde." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="chatbot-button" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </div>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            Asistente Audi Center
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-message bot typing">Escribiendo...</div>}
          </div>

          <div className="chatbot-input-area">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Pregunta por un modelo..."
            />
            <button onClick={send} disabled={loading}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}