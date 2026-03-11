import * as appointmentsRepository from "../repositories/appointmentsRepository.js";

export const createAppointment = async (data) => {
  return await appointmentsRepository.createAppointment(data);
};

export const getAppointments = async () => {
  return await appointmentsRepository.getAppointments();
};