import { useEffect, useState } from "react";
import {
  getCars,
  getUsedCars,
  deleteCar,
  deleteUsedCar
} from "../services/api";
import CarFormModal from "./CarFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

export default function CarsAdmin() {
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState("new");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    loadCars();
  }, [carType]);

  async function loadCars() {
    try {
      const data = carType === "new" ? await getCars() : await getUsedCars();
      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando inventario:", error);
      setCars([]);
    }
  }

  function openCreate() {
    setSelectedCar(null);
    setActiveModal("form");
  }

  function openEdit(car) {
    setSelectedCar(car);
    setActiveModal("form");
  }

  function openDelete(car) {
    setSelectedCar(car);
    setActiveModal("delete");
  }

  async function handleDelete() {
    try {
      if (carType === "new") {
        await deleteCar(selectedCar.id_car_model);
      } else {
        await deleteUsedCar(selectedCar.id_used_car);
      }

      await loadCars();
      setActiveModal(null);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error eliminando auto:", error);
      alert("No se pudo eliminar el auto");
    }
  }

  return (
    <div>
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-end", // Alinea los botones con el título
            marginBottom: "30px",
            marginTop: "20px",
            gap: "600px"
        }}>
            <div>
                <h1 style={{ marginBottom: "20px" }}>Inventario de Autos</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        className={carType === "new" ? "btn-primary-round" : "btn-cancel"}
                        onClick={() => setCarType("new")}
                    >
                        Nuevos
                    </button>
                    <button
                        className={carType === "used" ? "btn-primary-round" : "btn-cancel"}
                        onClick={() => setCarType("used")}
                    >
                        Usados
                    </button>
                </div>
            </div>

            <button className="btn-primary-round" onClick={openCreate}>
               Nuevo Auto
            </button>
        </div>

        <div className="table-wrapper">
                <table className="admin-table-full">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Modelo</th>
                    <th style={{ textAlign: "left" }}>Año</th>
                    <th style={{ textAlign: "left" }}>Precio</th>
                    {carType === "used" && <th style={{ textAlign: "left" }}>Kilometraje</th>}
                    {/* "Acciones" alineado a la derecha igual que los botones */}
                    <th style={{ textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id_car_model || car.id_used_car}>
                      <td className="bold-text">{car.model_name}</td>
                      <td>{car.model_year}</td>
                      <td>${Number(car.base_price || car.price || 0).toLocaleString("es-MX")}</td>
                      {carType === "used" && <td>{Number(car.odometer_km || 0).toLocaleString()} km</td>}
                      <td className="table-actions-right">
                        <button onClick={() => openEdit(car)} className="link-edit">Editar</button>
                        <button onClick={() => openDelete(car)} className="link-delete">Borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>   

      {activeModal === "form" && (
        <CarFormModal
          carType={carType}
          car={selectedCar}
          close={() => {
            setActiveModal(null);
            setSelectedCar(null);
          }}
          refresh={loadCars}
        />
      )}

      {activeModal === "delete" && (
        <DeleteConfirmModal
          car={selectedCar}
          close={() => {
            setActiveModal(null);
            setSelectedCar(null);
          }}
          confirm={handleDelete}
        />
      )}
    </div>
  );
}