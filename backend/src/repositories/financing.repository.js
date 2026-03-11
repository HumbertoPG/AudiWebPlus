import { pool as db}  from "../config/db.js";

export async function saveFinancing(data){

  const query = `
  INSERT INTO financing_requests
  (client_name,email,phone,interest_model,message)
  VALUES($1,$2,$3,$4,$5)
  RETURNING *
  `;

  const values = [
    data.client_name,
    data.email,
    data.phone,
    data.interest_model,
    data.message
  ];

  const result = await db.query(query,values);

  return result.rows[0];

}