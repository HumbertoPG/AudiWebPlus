import {
  listCars,
  getCar,
  getConfigurationsForCar,
  createNewCar,
  updateExistingCar,
  removeCar
} from "../services/car.service.js";

export async function getCars(req, res, next) {
  try {
    const cars = await listCars(req.query);
    res.json(cars);
  } catch (error) {
    next(error);
  }
}

export async function getCarById(req, res, next) {
  try {
    const car = await getCar(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function getCarConfigurations(req, res, next) {
  try {
    const configurations = await getConfigurationsForCar(req.params.id);
    res.json(configurations);
  } catch (error) {
    next(error);
  }
}

export async function createCar(req, res, next) {
  try {
    const car = await createNewCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
}

export async function updateCar(req, res, next) {
  try {
    const car = await updateExistingCar(req.params.id, req.body);
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function deleteCar(req, res, next) {
  try {
    await removeCar(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}