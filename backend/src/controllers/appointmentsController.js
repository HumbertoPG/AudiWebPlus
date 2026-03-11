import * as appointmentsService from "../services/appointmentsService.js";

export const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentsService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creando cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAppointments = async (_req, res) => {
  try {
    const appointments = await appointmentsService.getAppointments();
    res.json(appointments);
  } catch (error) {
    console.error("Error obteniendo citas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};