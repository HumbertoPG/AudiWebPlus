import { useState } from "react";
import { subscribeNewsletter } from "../services/api";

export default function Newsletter() { 
  const [email, setEmail] = useState("");

  async function submit() {
    if (!email) return alert("Ingresa un correo");
    try {
      await subscribeNewsletter(email);
      alert("Suscripción completada");
      setEmail("");
    } catch {
      console.log("Modo demo");
    }
  }

  return (
    <section className="newsletter-section-modern">
      <div className="newsletter-content">
        <div className="newsletter-text">
          <h2>Mantente a la vanguardia</h2>
          <p>Noticias exclusivas de Audi Center Angelópolis.</p>
        </div>
        <div className="newsletter-form-inline">
          <input
            className="popup-input-round newsletter-input"
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-primary newsletter-btn" onClick={submit}>
            Suscribirme
          </button>
        </div>
      </div>
    </section>
  );
}