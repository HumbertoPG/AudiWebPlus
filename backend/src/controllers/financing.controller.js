import {
  listFinancingRequests,
  getFinancingRequest,
  createNewFinancingRequest,
  updateExistingFinancingRequest,
  removeFinancingRequest
} from "../services/financing.service.js";

export async function getFinancingRequests(req, res, next) {
  try {
    const items = await listFinancingRequests(req.query);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function getFinancingRequestById(req, res, next) {
  try {
    const item = await getFinancingRequest(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createFinancingRequest(req, res, next) {
  try {
    const item = await createNewFinancingRequest(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateFinancingRequest(req, res, next) {
  try {
    const item = await updateExistingFinancingRequest(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteFinancingRequest(req, res, next) {
  try {
    await removeFinancingRequest(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}