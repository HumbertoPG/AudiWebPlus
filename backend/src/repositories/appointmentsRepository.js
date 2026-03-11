import { pool } from "../config/db.js";

export const createAppointment = async ({
  client_name,
  email,
  phone,
  appointment_date,
  interest_model,
  message,
}) => {
  const query = `
    INSERT INTO appointments
    (client_name, email, phone, appointment_date, interest_model, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    client_name,
    email,
    phone,
    appointment_date,
    interest_model,
    message,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getAppointments = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM appointments ORDER BY created_at DESC"
  );
  return rows;
};