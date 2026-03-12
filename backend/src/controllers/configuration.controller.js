import {
  listConfigurations,
  getConfiguration,
  createNewConfiguration,
  updateExistingConfiguration,
  removeConfiguration
} from "../services/configuration.service.js";

export async function getConfigurations(req, res, next) {
  try {
    const items = await listConfigurations(req.query);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function getConfigurationById(req, res, next) {
  try {
    const item = await getConfiguration(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createConfiguration(req, res, next) {
  try {
    const item = await createNewConfiguration(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateConfiguration(req, res, next) {
  try {
    const item = await updateExistingConfiguration(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteConfiguration(req, res, next) {
  try {
    await removeConfiguration(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}