import {
  findAllCars,
  findCarById,
  findConfigurationsByCarId,
  insertCar,
  updateCarById,
  deleteCarById
} from "../repositories/car.repository.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw createHttpError(400, "Invalid model id");
  }

  return parsedId;
}

function normalizeRequiredText(value, fieldName) {
  const normalized = String(value || "").trim();

  if (!normalized) {
    throw createHttpError(400, `${fieldName} is required`);
  }

  return normalized;
}

function normalizeOptionalText(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return String(value).trim();
}

function normalizeOptionalInteger(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative integer`);
  }

  return parsed;
}

function normalizeOptionalFloat(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative number`);
  }

  return parsed;
}

function normalizeCarPayload(payload) {
  const model_name = normalizeRequiredText(payload?.model_name, "model_name");
  const fuel_type = normalizeRequiredText(payload?.fuel_type, "fuel_type");

  const model_year = Number(payload?.model_year);
  const base_price = Number(payload?.base_price);

  if (!Number.isInteger(model_year) || model_year < 1886 || model_year > 2100) {
    throw createHttpError(400, "model_year must be between 1886 and 2100");
  }

  if (!Number.isFinite(base_price) || base_price < 0) {
    throw createHttpError(400, "base_price must be a valid non-negative number");
  }

  return {
    model_name,
    model_year,
    base_price,
    description: normalizeOptionalText(payload?.description),
    main_image_url: normalizeOptionalText(payload?.main_image_url),
    fuel_capacity: normalizeOptionalInteger(payload?.fuel_capacity, "fuel_capacity"),
    horse_power: normalizeOptionalInteger(payload?.horse_power, "horse_power"),
    v_max: normalizeOptionalInteger(payload?.v_max, "v_max"),
    acceleration: normalizeOptionalFloat(payload?.acceleration, "acceleration"),
    cylinders: normalizeOptionalInteger(payload?.cylinders, "cylinders"),
    fuel_type
  };
}

export async function listCars(query) {
  return await findAllCars(query);
}

export async function getCar(id) {
  const parsedId = parseId(id);
  const car = await findCarById(parsedId);

  if (!car) {
    throw createHttpError(404, "Model not found");
  }

  return car;
}

export async function getConfigurationsForCar(id) {
  const parsedId = parseId(id);
  const car = await findCarById(parsedId);

  if (!car) {
    throw createHttpError(404, "Model not found");
  }

  return await findConfigurationsByCarId(parsedId);
}

export async function createNewCar(payload) {
  const normalizedPayload = normalizeCarPayload(payload);
  return await insertCar(normalizedPayload);
}

export async function updateExistingCar(id, payload) {
  const parsedId = parseId(id);
  const normalizedPayload = normalizeCarPayload(payload);

  const updatedCar = await updateCarById(parsedId, normalizedPayload);

  if (!updatedCar) {
    throw createHttpError(404, "Model not found");
  }

  return updatedCar;
}

export async function removeCar(id) {
  const parsedId = parseId(id);
  const deletedCar = await deleteCarById(parsedId);

  if (!deletedCar) {
    throw createHttpError(404, "Model not found");
  }

  return deletedCar;
}