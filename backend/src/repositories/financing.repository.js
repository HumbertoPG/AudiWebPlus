import { pool } from "../config/db.js";

const baseSelect = `
  SELECT
    id_financing_request,
    client_name,
    email,
    phone,
    interest_model,
    message,
    created_at
  FROM financing_requests
`;

export async function findAllFinancingRequests() {
  const result = await pool.query(
    `
      ${baseSelect}
      ORDER BY created_at DESC, id_financing_request DESC
    `
  );

  return result.rows;
}

export async function findFinancingRequestById(id) {
  const result = await pool.query(
    `
      ${baseSelect}
      WHERE id_financing_request = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function insertFinancingRequest(data) {
  const result = await pool.query(
    `
      INSERT INTO financing_requests (
        client_name,
        email,
        phone,
        interest_model,
        message
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING
        id_financing_request,
        client_name,
        email,
        phone,
        interest_model,
        message,
        created_at
    `,
    [
      data.client_name,
      data.email,
      data.phone,
      data.interest_model,
      data.message
    ]
  );

  return result.rows[0];
}

export async function updateFinancingRequestById(id, data) {
  const result = await pool.query(
    `
      UPDATE financing_requests
      SET
        client_name = $1,
        email = $2,
        phone = $3,
        interest_model = $4,
        message = $5
      WHERE id_financing_request = $6
      RETURNING
        id_financing_request,
        client_name,
        email,
        phone,
        interest_model,
        message,
        created_at
    `,
    [
      data.client_name,
      data.email,
      data.phone,
      data.interest_model,
      data.message,
      id
    ]
  );

  return result.rows[0] || null;
}

export async function deleteFinancingRequestById(id) {
  const result = await pool.query(
    `
      DELETE FROM financing_requests
      WHERE id_financing_request = $1
      RETURNING id_financing_request
    `,
    [id]
  );

  return result.rows[0] || null;
}