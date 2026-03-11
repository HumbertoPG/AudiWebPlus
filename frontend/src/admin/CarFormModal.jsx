import { useEffect, useState } from "react";
import {
  createCar,
  updateCar,
  createUsedCar,
  updateUsedCar
} from "../services/api";

const NEW_CAR_INITIAL = {
  model_name: "",
  model_year: "",
  base_price: "",
  description: "",
  main_image_url: "",
  fuel_capacity: "",
  horse_power: "",
  v_max: "",
  acceleration: "",
  cylinders: "",
  fuel_type: ""
};

const USED_CAR_INITIAL = {
  model_name: "",
  odometer_km: "",
  price: "",
  color: "",
  engine: "",
  fuel_type: "",
  description: "",
  main_image_url: "",
  model_year: "",
  horse_power: "",
  drivetrain: "",
  transmission: ""
};

export default function CarFormModal({ carType, car, close, refresh }) {
  const isEdit = Boolean(car);

  const [form, setForm] = useState(
    car || (carType === "new" ? NEW_CAR_INITIAL : USED_CAR_INITIAL)
  );

  useEffect(() => {
    setForm(car || (carType === "new" ? NEW_CAR_INITIAL : USED_CAR_INITIAL));
  }, [car, carType]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (carType === "new") {
        if (isEdit) {
          await updateCar(car.id_car_model, form);
        } else {
          await createCar(form);
        }
      } else {
        if (isEdit) {
          await updateUsedCar(car.id_used_car, form);
        } else {
          await createUsedCar(form);
        }
      }

      await refresh();
      close();
    } catch (error) {
      console.error("Error guardando auto:", error);
      alert("Error al guardar el auto");
    }
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="popup modern-popup" style={{ maxWidth: "800px", width: "95%" }} onClick={(e) => e.stopPropagation()}>
        <h2>
          {isEdit ? "Editar" : "Nuevo"} auto {carType === "new" ? "nuevo" : "usado"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <input name="model_name" placeholder="Modelo" value={form.model_name} onChange={handleChange} required />
            <input name="model_year" placeholder="Año" value={form.model_year} onChange={handleChange} required />

            {carType === "new" ? (
              <>
                <input name="base_price" placeholder="Precio base" value={form.base_price} onChange={handleChange} required />
                <input name="fuel_type" placeholder="Combustible" value={form.fuel_type} onChange={handleChange} required />
                <input name="fuel_capacity" placeholder="Capacidad de combustible" value={form.fuel_capacity} onChange={handleChange} />
                <input name="horse_power" placeholder="HP" value={form.horse_power} onChange={handleChange} />
                <input name="v_max" placeholder="Velocidad máxima" value={form.v_max} onChange={handleChange} />
                <input name="acceleration" placeholder="Aceleración" value={form.acceleration} onChange={handleChange} />
                <input name="cylinders" placeholder="Cilindros" value={form.cylinders} onChange={handleChange} />
              </>
            ) : (
              <>
                <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} required />
                <input name="odometer_km" placeholder="Kilometraje" value={form.odometer_km} onChange={handleChange} required />
                <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
                <input name="engine" placeholder="Motor" value={form.engine} onChange={handleChange} />
                <input name="fuel_type" placeholder="Combustible" value={form.fuel_type} onChange={handleChange} />
                <input name="horse_power" placeholder="HP" value={form.horse_power} onChange={handleChange} />
                <input name="drivetrain" placeholder="Tracción" value={form.drivetrain} onChange={handleChange} />
                <input name="transmission" placeholder="Transmisión" value={form.transmission} onChange={handleChange} />
              </>
            )}

            <input
              name="main_image_url"
              placeholder="URL imagen"
              value={form.main_image_url}
              onChange={handleChange}
              className="full"
            />

            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              className="full"
            />
          </div>

          <div className="popup-actions-row" style={{ marginTop: "20px" }}>
            <button type="button" className="btn-cancel" onClick={close}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary-round">
              {isEdit ? "Guardar cambios" : "Crear auto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}