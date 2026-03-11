import * as usedCarsService from "../services/usedCarsService.js";

export const getUsedCars = async (req, res) => {
  try {
    console.log("Entró a GET /api/used_cars");
    const cars = await usedCarsService.getUsedCars();
    console.log("Used cars encontrados:", cars.length);
    res.json(cars);
  } catch (error) {
    console.error("Error en getUsedCars:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUsedCar = async (req, res) => {
  try {
    console.log("Entró a GET /api/used_cars/:id", req.params.id);
    const car = await usedCarsService.getUsedCar(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error en getUsedCar:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};