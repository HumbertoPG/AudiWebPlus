import { Link } from "react-router-dom";
import defaultCar from "../assets/a3.jpeg";

export default function CarCard({ car, type = "new" }) {
  if (!car) return null;

  console.log("Datos recibidos en la tarjeta de:", car.model_name, car);

  const imageSrc =
    car.main_image_url && car.main_image_url.startsWith("http")
      ? car.main_image_url
      : defaultCar;

  const id = type === "new" ? car.id_car_model : car.id_used_car;
  const finalId = id || car.id_car_model || car.id_used_car;

  const detailPath =
    type === "new" ? `/models/${finalId}` : `/used-cars/${finalId}`;

  return (
    <div className="car-card">
      {type === "used" && <span className="badge-used">Seminuevo</span>}

      <img
        src={imageSrc}
        alt={car.model_name}
        className="car-image"
        onError={(e) => {
          e.target.src = defaultCar;
        }}
      />

      <div className="car-info">
        <h3 className="car-title">
          {car.model_name} {car.model_year}
        </h3>

        <p className="price">
          {type === "new" ? "Desde " : ""}
          ${Number(car.base_price || car.price || 0).toLocaleString("es-MX")}
        </p>

        {type === "used" && (
          <p className="car-meta">
            {Number(car.odometer_km || 0).toLocaleString()} km •{" "}
            {car.transmission || "Manual"}
          </p>
        )}

        <Link to={detailPath}>
          <button className="btn-primary-round">Ver detalles</button>
        </Link>
      </div>
    </div>
  );
}