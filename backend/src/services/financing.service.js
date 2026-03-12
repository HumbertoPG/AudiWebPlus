import {
  findAllFinancingRequests,
  findFinancingRequestById,
  insertFinancingRequest,
  updateFinancingRequestById,
  deleteFinancingRequestById
} from "../repositories/financing.repository.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, "Invalid financing request id");
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

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw createHttpError(400, "email must be valid");
  }

  return email;
}

function normalizePayload(payload) {
  return {
    client_name: normalizeRequiredText(payload?.client_name, "client_name"),
    email: normalizeEmail(payload?.email),
    phone: normalizeOptionalText(payload?.phone),
    interest_model: normalizeRequiredText(payload?.interest_model, "interest_model"),
    message: normalizeOptionalText(payload?.message)
  };
}

export async function listFinancingRequests() {
  return await findAllFinancingRequests();
}

export async function getFinancingRequest(id) {
  const parsedId = parseId(id);
  const item = await findFinancingRequestById(parsedId);

  if (!item) {
    throw createHttpError(404, "Financing request not found");
  }

  return item;
}

export async function createNewFinancingRequest(payload) {
  const normalized = normalizePayload(payload);
  return await insertFinancingRequest(normalized);
}

export async function updateExistingFinancingRequest(id, payload) {
  const parsedId = parseId(id);
  const normalized = normalizePayload(payload);
  const updated = await updateFinancingRequestById(parsedId, normalized);

  if (!updated) {
    throw createHttpError(404, "Financing request not found");
  }

  return updated;
}

export async function removeFinancingRequest(id) {
  const parsedId = parseId(id);
  const deleted = await deleteFinancingRequestById(parsedId);

  if (!deleted) {
    throw createHttpError(404, "Financing request not found");
  }

  return deleted;
}