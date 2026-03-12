import {
  findAllConfigurations,
  findConfigurationById,
  insertConfiguration,
  updateConfigurationById,
  deleteConfigurationById
} from "../repositories/configuration.repository.js";
import { findCarById } from "../repositories/car.repository.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(id, fieldName = "id") {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, `Invalid ${fieldName}`);
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

function normalizeRequiredNumber(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative number`);
  }

  return parsed;
}

function normalizeOptionalNumber(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw createHttpError(400, `${fieldName} must be a non-negative number`);
  }

  return parsed;
}

function normalizeConfigurationPayload(payload) {
  const car_model_id = parseId(payload?.car_model_id, "car_model_id");

  return {
    car_model_id,
    configuration_name: normalizeRequiredText(payload?.configuration_name, "configuration_name"),
    price: normalizeRequiredNumber(payload?.price, "price"),
    description: normalizeOptionalText(payload?.description),
    equipment: normalizeOptionalText(payload?.equipment),
    fuel_type: normalizeOptionalText(payload?.fuel_type),
    image_url: normalizeOptionalText(payload?.image_url),
    trunk_volume: normalizeOptionalNumber(payload?.trunk_volume, "trunk_volume"),
    acceleration: normalizeOptionalNumber(payload?.acceleration, "acceleration")
  };
}

export async function listConfigurations(query) {
  return await findAllConfigurations(query);
}

export async function getConfiguration(id) {
  const parsedId = parseId(id, "configuration id");
  const item = await findConfigurationById(parsedId);

  if (!item) {
    throw createHttpError(404, "Configuration not found");
  }

  return item;
}

export async function createNewConfiguration(payload) {
  const normalized = normalizeConfigurationPayload(payload);
  const parentCar = await findCarById(normalized.car_model_id);

  if (!parentCar) {
    throw createHttpError(404, "Related car model not found");
  }

  return await insertConfiguration(normalized);
}

export async function updateExistingConfiguration(id, payload) {
  const parsedId = parseId(id, "configuration id");
  const normalized = normalizeConfigurationPayload(payload);
  const parentCar = await findCarById(normalized.car_model_id);

  if (!parentCar) {
    throw createHttpError(404, "Related car model not found");
  }

  const updated = await updateConfigurationById(parsedId, normalized);

  if (!updated) {
    throw createHttpError(404, "Configuration not found");
  }

  return updated;
}

export async function removeConfiguration(id) {
  const parsedId = parseId(id, "configuration id");
  const deleted = await deleteConfigurationById(parsedId);

  if (!deleted) {
    throw createHttpError(404, "Configuration not found");
  }

  return deleted;
}