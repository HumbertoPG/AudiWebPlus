import {
  findAllUsedCars,
  findUsedCarById,
  insertUsedCar,
  updateUsedCarById,
  deleteUsedCarById
} from "../repositories/usedCarsRepository.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, "Invalid used car id");
  }

  return parsed;
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

function normalizeRequiredInteger(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative integer`);
  }

  return parsed;
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

function normalizeRequiredNumber(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative number`);
  }

  return parsed;
}

function normalizeOptionalYear(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1886 || parsed > 2100) {
    throw createHttpError(400, "model_year must be between 1886 and 2100");
  }

  return parsed;
}

function normalizeUsedCarPayload(payload) {
  return {
    model_name: normalizeRequiredText(payload?.model_name, "model_name"),
    odometer_km: normalizeRequiredInteger(payload?.odometer_km, "odometer_km"),
    price: normalizeRequiredNumber(payload?.price, "price"),
    color: normalizeOptionalText(payload?.color),
    engine: normalizeOptionalText(payload?.engine),
    fuel_type: normalizeOptionalText(payload?.fuel_type),
    description: normalizeOptionalText(payload?.description),
    main_image_url: normalizeOptionalText(payload?.main_image_url),
    model_year: normalizeOptionalYear(payload?.model_year),
    horse_power: normalizeOptionalInteger(payload?.horse_power, "horse_power"),
    drivetrain: normalizeOptionalText(payload?.drivetrain),
    transmission: normalizeOptionalText(payload?.transmission)
  };
}

export async function listUsedCars(query) {
  return await findAllUsedCars(query);
}

export async function getUsedCar(id) {
  const parsedId = parseId(id);
  const car = await findUsedCarById(parsedId);

  if (!car) {
    throw createHttpError(404, "Used car not found");
  }

  return car;
}

export async function createNewUsedCar(payload) {
  const normalized = normalizeUsedCarPayload(payload);
  return await insertUsedCar(normalized);
}

export async function updateExistingUsedCar(id, payload) {
  const parsedId = parseId(id);
  const normalized = normalizeUsedCarPayload(payload);
  const updated = await updateUsedCarById(parsedId, normalized);

  if (!updated) {
    throw createHttpError(404, "Used car not found");
  }

  return updated;
}

export async function removeUsedCar(id) {
  const parsedId = parseId(id);
  const deleted = await deleteUsedCarById(parsedId);

  if (!deleted) {
    throw createHttpError(404, "Used car not found");
  }

  return deleted;
}