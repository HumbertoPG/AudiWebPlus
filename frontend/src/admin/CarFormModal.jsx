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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clean = (val, isFloat = false) => {
      if (val === "" || val === undefined || val === null) return null;
      return isFloat ? parseFloat(val) : parseInt(val, 10);
    };

    let dataToSend = carType === "new" 
      ? {
          ...form,
          model_year: clean(form.model_year),
          base_price: clean(form.base_price, true),
          fuel_capacity: clean(form.fuel_capacity),
          horse_power: clean(form.horse_power),
          v_max: clean(form.v_max),
          acceleration: clean(form.acceleration, true),
          cylinders: clean(form.cylinders),
        }
      : {
          ...form,
          model_year: clean(form.model_year),
          price: clean(form.price, true),
          odometer_km: clean(form.odometer_km),
          horse_power: clean(form.horse_power),
        };

    try {
      if (carType === "new") {
        isEdit ? await updateCar(car.id_car_model, dataToSend) : await createCar(dataToSend);
      } else {
        isEdit ? await updateUsedCar(car.id_used_car, dataToSend) : await createUsedCar(dataToSend);
      }
      await refresh();
      close();
    } catch (error) {
      alert("Error al guardar: " + (error.response?.data?.message || "Revisa los datos"));
    }
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="popup modern-popup" style={{ maxWidth: "750px", width: "95%" }} onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? "Editar" : "Nuevo"} Auto {carType === "new" ? "Nuevo" : "Usado"}</h3>
        <p className="popup-subtitle">Completa la información del inventario</p>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div className="form-grid-2">
            <div className="popup-field">
              <input className="popup-input-round" name="model_name" placeholder="Modelo" value={form.model_name} onChange={handleChange} required />
            </div>
            <div className="popup-field">
              <input className="popup-input-round" type="number" name="model_year" placeholder="Año" value={form.model_year} onChange={handleChange} required />
            </div>

            {carType === "new" ? (
              <>
                <div className="popup-field">
                  <input className="popup-input-round" type="number" step="0.01" name="base_price" placeholder="Precio base" value={form.base_price} onChange={handleChange} required />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" name="fuel_type" placeholder="Combustible" value={form.fuel_type} onChange={handleChange} required />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" type="number" name="horse_power" placeholder="HP" value={form.horse_power} onChange={handleChange} />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" type="number" step="0.1" name="acceleration" placeholder="Aceleración" value={form.acceleration} onChange={handleChange} />
                </div>
              </>
            ) : (
              <>
                <div className="popup-field">
                  <input className="popup-input-round" type="number" step="0.01" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" type="number" name="odometer_km" placeholder="Kilometraje" value={form.odometer_km} onChange={handleChange} required />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" name="color" placeholder="Color" value={form.color} onChange={handleChange} />
                </div>
                <div className="popup-field">
                  <input className="popup-input-round" name="fuel_type" placeholder="Combustible" value={form.fuel_type} onChange={handleChange} />
                </div>
              </>
            )}

            <div className="popup-field full">
              <input className="popup-input-round" name="main_image_url" placeholder="URL de imagen" value={form.main_image_url} onChange={handleChange} />
            </div>

            <div className="popup-field full">
              <textarea 
                className="popup-input-round" 
                name="description" 
                placeholder="Descripción detallada..." 
                value={form.description} 
                onChange={handleChange}
                style={{ height: "80px", borderRadius: "15px", resize: "none" }}
              />
            </div>
          </div>

          <div className="popup-actions-row" style={{ marginTop: "30px" }}>
            <button type="button" className="btn-cancel" onClick={close}>Cancelar</button>
            <button type="submit" className="btn-primary-round">
              {isEdit ? "Guardar Cambios" : "Crear Auto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}