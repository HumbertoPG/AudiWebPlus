import {
  listAppointments,
  getAppointment,
  createNewAppointment,
  updateExistingAppointment,
  removeAppointment
} from "../services/appointmentsService.js";

export async function getAppointments(req, res, next) {
  try {
    const items = await listAppointments();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function getAppointmentById(req, res, next) {
  try {
    const item = await getAppointment(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function createAppointment(req, res, next) {
  try {
    const item = await createNewAppointment(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateAppointment(req, res, next) {
  try {
    const item = await updateExistingAppointment(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    await removeAppointment(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}