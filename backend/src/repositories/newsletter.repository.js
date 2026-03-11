import {pool as db} from "../config/db.js";

export async function addSubscriber(email){

  const query = `
    INSERT INTO newsletter_subscribers(email)
    VALUES($1)
    RETURNING *
  `;

  const result = await db.query(query,[email]);

  return result.rows[0];

}