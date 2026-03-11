import * as usedCarsRepository from "../repositories/usedCarsRepository.js";

export const getUsedCars = async () => {
  return await usedCarsRepository.getAllUsedCars();
};

export const getUsedCar = async (id) => {
  const car = await usedCarsRepository.getUsedCarById(id);

  if (!car) return null;

  return {
    ...car,
    price: parseFloat(car.price),
    odometer_km: parseInt(car.odometer_km, 10),
  };
};