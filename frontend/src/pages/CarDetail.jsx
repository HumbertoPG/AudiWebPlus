import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCar, getUsedCar } from "../services/api";

import FinancingPopup from "../components/FinancingPopup";
import AppointmentPopup from "../components/AppointmentPopup";

import defaultImg from "../assets/a3.jpeg";

export default function CarDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFinancing, setShowFinancing] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  const isUsed = location.pathname.includes("used-cars");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log("Detalle ID:", id, "isUsed:", isUsed);

        const data = isUsed ? await getUsedCar(id) : await getCar(id);
        console.log("Detalle data:", data);

        setCar(data);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, isUsed]);

  if (loading) return <div className="main-content">Cargando detalles...</div>;
  if (!car) return <div className="main-content">No se encontró el vehículo.</div>;

  const displayPrice = isUsed ? car.price : car.base_price;
  const displayImage =
    car.main_image_url && car.main_image_url.startsWith("http")
      ? car.main_image_url
      : defaultImg;

  const specKilometraje = isUsed
    ? `${Number(car.odometer_km || 0).toLocaleString()} km`
    : `${car.v_max || "N/A"} km/h`;

  const labelKilometraje = isUsed ? "Kilometraje" : "V. Máxima";
  const specTraccion = isUsed
    ? car.drivetrain || "N/A"
    : car.fuel_type || "Gasolina";
  const labelTraccion = isUsed ? "Tracción" : "Combustible";

  return (
    <div className="main-content detail-full-screen">
      <button className="btn-back-modern" onClick={() => navigate(-1)}>
        <span className="icon-arrow">←</span>
        <span className="text-back">Volver</span>
      </button>

      <div className="modern-detail-wrapper">
        <div className="visual-section">
          <div className="main-image-container">
            <img
              src={displayImage}
              alt={car.model_name}
              className="main-featured-img"
              onError={(e) => {
                e.target.src = defaultImg;
              }}
            />
          </div>
        </div>

        <div className="info-section">
          <header className="info-header">
            <span className="year-label">{car.model_year}</span>
            <h1 className="model-name-large">{car.model_name}</h1>
            <h2 className="price-large">
              {isUsed ? "" : "Desde "}$
              {Number(displayPrice || 0).toLocaleString("es-MX")}
            </h2>
          </header>

          <p className="description-large">{car.description}</p>

          <div className="specs-container-modern">
            <div className="spec-box">
              <span className="spec-label">Potencia</span>
              <span className="spec-value">{car.horse_power || "N/A"} HP</span>
            </div>
            <div className="spec-box">
              <span className="spec-label">Aceleración</span>
              <span className="spec-value">{car.acceleration || "N/A"}s</span>
            </div>
            <div className="spec-box">
              <span className="spec-label">{labelKilometraje}</span>
              <span className="spec-value">{specKilometraje}</span>
            </div>
            <div className="spec-box">
              <span className="spec-label">{labelTraccion}</span>
              <span className="spec-value">{specTraccion}</span>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="btn-black-gold"
              onClick={() => setShowFinancing(true)}
            >
              Solicitar Financiamiento
            </button>
            <button
              className="btn-w-gold"
              onClick={() => setShowAppointment(true)}
            >
              Agendar Prueba de Manejo
            </button>
          </div>
        </div>
      </div>

      {showFinancing && (
        <div className="modal-overlay" onClick={() => setShowFinancing(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <FinancingPopup
              modelName={car.model_name}
              onClose={() => setShowFinancing(false)}
            />
          </div>
        </div>
      )}

      {showAppointment && (
        <div className="modal-overlay" onClick={() => setShowAppointment(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <AppointmentPopup
              modelName={car.model_name}
              onClose={() => setShowAppointment(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}