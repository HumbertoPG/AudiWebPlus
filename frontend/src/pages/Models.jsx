import { useEffect, useState } from "react";
import { getCars, getUsedCars } from "../services/api";
import CarCard from "../components/CarCard";

import a3Img from "../assets/a3.jpeg";
import q5Img from "../assets/q5.png";
import rsImg from "../assets/r.webp";

const MOCK_CARS = [
  {
    id_car_model: 1,
    model_name: "Audi A3",
    model_year: 2024,
    base_price: 750000,
    description: "Sedán deportivo compacto",
    main_image_url: a3Img,
  },
  {
    id_car_model: 2,
    model_name: "Audi Q5",
    model_year: 2024,
    base_price: 950000,
    description: "SUV premium familiar",
    main_image_url: q5Img,
  },
  {
    id_car_model: 3,
    model_name: "Audi RS6",
    model_year: 2024,
    base_price: 1800000,
    description: "Performance Avant",
    main_image_url: rsImg,
  },
];

export default function Models() {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("nuevos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const data =
          viewMode === "nuevos" ? await getCars() : await getUsedCars();

        console.log("DATA EN MODELS:", data);

        if (Array.isArray(data)) {
          if (viewMode === "nuevos" && data.length === 0) {
            setCars(MOCK_CARS);
          } else {
            setCars(data);
          }
        } else {
          throw new Error("La API no devolvió un array");
        }
      } catch (e) {
        console.error("Error real cargando autos:", e);
        setError(e.message || "Error al cargar vehículos");

        if (viewMode === "nuevos") {
          setCars(MOCK_CARS);
        } else {
          setCars([]);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [viewMode]);

  return (
    <div className="main-content">
      <div
        className="models-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h1>Modelos Audi</h1>

        <div className="view-selector" style={{ display: "flex", gap: "15px" }}>
          <button
            className={viewMode === "nuevos" ? "btn-primary-round" : "btn-cancel"}
            onClick={() => setViewMode("nuevos")}
          >
            Nuevos
          </button>
          <button
            className={viewMode === "usados" ? "btn-primary-round" : "btn-cancel"}
            onClick={() => setViewMode("usados")}
          >
            Usados
          </button>
        </div>
      </div>

      {loading && <p>Cargando vehículos...</p>}

      {!loading && error && (
        <p style={{ color: "crimson" }}>
          {error}
        </p>
      )}

      {!loading && !error && viewMode === "usados" && cars.length === 0 && (
        <p>No hay autos usados disponibles.</p>
      )}

      <div className="car-grid">
        {cars.map((car) => (
          <CarCard
            key={car.id_car_model || car.id_used_car}
            car={car}
            type={viewMode === "usados" ? "used" : "new"}
          />
        ))}
      </div>
    </div>
  );
}