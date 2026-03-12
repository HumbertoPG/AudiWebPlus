import { pool } from "../config/db.js";

const baseSelect = `
  SELECT
    id_appointment,
    client_name,
    email,
    phone,
    appointment_date,
    interest_model,
    message,
    created_at
  FROM appointments
`;

export async function findAllAppointments() {
  const result = await pool.query(
    `
      ${baseSelect}
      ORDER BY appointment_date DESC, id_appointment DESC
    `
  );

  return result.rows;
}

export async function findAppointmentById(id) {
  const result = await pool.query(
    `
      ${baseSelect}
      WHERE id_appointment = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function insertAppointment(data) {
  const result = await pool.query(
    `
      INSERT INTO appointments (
        client_name,
        email,
        phone,
        appointment_date,
        interest_model,
        message
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING
        id_appointment,
        client_name,
        email,
        phone,
        appointment_date,
        interest_model,
        message,
        created_at
    `,
    [
      data.client_name,
      data.email,
      data.phone,
      data.appointment_date,
      data.interest_model,
      data.message
    ]
  );

  return result.rows[0];
}

export async function updateAppointmentById(id, data) {
  const result = await pool.query(
    `
      UPDATE appointments
      SET
        client_name = $1,
        email = $2,
        phone = $3,
        appointment_date = $4,
        interest_model = $5,
        message = $6
      WHERE id_appointment = $7
      RETURNING
        id_appointment,
        client_name,
        email,
        phone,
        appointment_date,
        interest_model,
        message,
        created_at
    `,
    [
      data.client_name,
      data.email,
      data.phone,
      data.appointment_date,
      data.interest_model,
      data.message,
      id
    ]
  );

  return result.rows[0] || null;
}

export async function deleteAppointmentById(id) {
  const result = await pool.query(
    `
      DELETE FROM appointments
      WHERE id_appointment = $1
      RETURNING id_appointment
    `,
    [id]
  );

  return result.rows[0] || null;
}