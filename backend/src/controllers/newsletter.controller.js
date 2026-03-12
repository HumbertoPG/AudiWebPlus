import {
  listSubscribers,
  getSubscriber,
  createNewSubscriber,
  updateExistingSubscriber,
  removeSubscriber
} from "../services/newsletter.service.js";

export async function getSubscribers(req, res, next) {
  try {
    const items = await listSubscribers();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function getSubscriberById(req, res, next) {
  try {
    const item = await getSubscriber(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createSubscriber(req, res, next) {
  try {
    const item = await createNewSubscriber(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateSubscriber(req, res, next) {
  try {
    const item = await updateExistingSubscriber(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteSubscriber(req, res, next) {
  try {
    await removeSubscriber(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}