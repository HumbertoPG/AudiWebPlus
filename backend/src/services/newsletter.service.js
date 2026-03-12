import {
  findAllSubscribers,
  findSubscriberById,
  insertSubscriber,
  updateSubscriberById,
  deleteSubscriberById
} from "../repositories/newsletter.repository.js";

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError(400, "Invalid subscriber id");
  }

  return parsed;
}

function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw createHttpError(400, "email must be valid");
  }

  return email;
}

export async function listSubscribers() {
  return await findAllSubscribers();
}

export async function getSubscriber(id) {
  const parsedId = parseId(id);
  const item = await findSubscriberById(parsedId);

  if (!item) {
    throw createHttpError(404, "Subscriber not found");
  }

  return item;
}

export async function createNewSubscriber(payload) {
  try {
    const email = normalizeEmail(payload?.email);
    return await insertSubscriber(email);
  } catch (error) {
    if (error?.code === "23505") {
      throw createHttpError(409, "This email is already subscribed");
    }
    throw error;
  }
}

export async function updateExistingSubscriber(id, payload) {
  const parsedId = parseId(id);
  const email = normalizeEmail(payload?.email);

  try {
    const updated = await updateSubscriberById(parsedId, email);

    if (!updated) {
      throw createHttpError(404, "Subscriber not found");
    }

    return updated;
  } catch (error) {
    if (error?.code === "23505") {
      throw createHttpError(409, "This email is already subscribed");
    }
    throw error;
  }
}

export async function removeSubscriber(id) {
  const parsedId = parseId(id);
  const deleted = await deleteSubscriberById(parsedId);

  if (!deleted) {
    throw createHttpError(404, "Subscriber not found");
  }

  return deleted;
}