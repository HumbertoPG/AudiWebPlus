import { useEffect, useState } from "react";
import { getCars } from "../services/api";
import CarCard from "../components/CarCard";
import Newsletter from "../components/Newsletter";
import AppointmentPopup from "../components/AppointmentPopup";
import FinancingPopup from "../components/FinancingPopup";
import audiHero from "../assets/audi.jpg.avif";
import bigAudi from "../assets/big_audi.png";


export default function Home() {
  const [cars, setCars] = useState([]);
  const [activeImage, setActiveImage] = useState(audiHero);

  useEffect(() => {
    getCars()
      .then(data => {
        // Si el back responde con un error o array vacío, usamos mocks
        if (data && data.length > 0 && !data.error) {
          setCars(data);
        } else {
          throw new Error("No data");
        }
      })
  }, []);

  return (
    <div className="main-content">
  <section className="hero-full-screen">
    {/* La imagen del auto de fondo */}
    <img src={audiHero} className="hero-bg-image" alt="Audi Hero" />
    
    {/* El overlay con degradado y el logo encima */}
    <div className="hero-content-overlay">
      <img src={bigAudi} className="hero-logo-centered" alt="Audi Logo" />
    </div>
  </section>

  <div className="admin-content-inner">
    <section className="location-section">
          <h2>Visítanos en Angelópolis</h2>
          <p style={{ color: '#666', marginBottom: '20px' , marginTop: '10px'}}>
            Atlixcáyotl 2304, Reserva Territorial Atlixcáyotl, Puebla.
          </p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.132644203666!2d-98.2487974238536!3d19.01397098218151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc6697eb7e5d7%3A0x4c3fa33810f31bd2!2sAudi%20Center%20Angel%C3%B3polis!5e0!3m2!1ses-419!2smx!4v1709900000000!5m2!1ses-419!2smx"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "20px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      <Newsletter />
  </div>
    </div>
  );
}