import {
  listUsedCars,
  getUsedCar,
  createNewUsedCar,
  updateExistingUsedCar,
  removeUsedCar
} from "../services/usedCarsService.js";

export async function getUsedCars(req, res, next) {
  try {
    const cars = await listUsedCars(req.query);
    res.json(cars);
  } catch (error) {
    next(error);
  }
}

export async function getUsedCarById(req, res, next) {
  try {
    const car = await getUsedCar(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function createUsedCar(req, res, next) {
  try {
    const car = await createNewUsedCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
}

export async function updateUsedCar(req, res, next) {
  try {
    const car = await updateExistingUsedCar(req.params.id, req.body);
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function deleteUsedCar(req, res, next) {
  try {
    await removeUsedCar(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}