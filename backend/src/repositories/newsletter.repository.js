import { pool } from "../config/db.js";

const baseSelect = `
  SELECT
    id_newsletter_subscriber,
    email,
    subscribed_at
  FROM newsletter_subscribers
`;

export async function findAllSubscribers() {
  const result = await pool.query(
    `
      ${baseSelect}
      ORDER BY subscribed_at DESC, id_newsletter_subscriber DESC
    `
  );

  return result.rows;
}

export async function findSubscriberById(id) {
  const result = await pool.query(
    `
      ${baseSelect}
      WHERE id_newsletter_subscriber = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function insertSubscriber(email) {
  const result = await pool.query(
    `
      INSERT INTO newsletter_subscribers (email)
      VALUES ($1)
      RETURNING
        id_newsletter_subscriber,
        email,
        subscribed_at
    `,
    [email]
  );

  return result.rows[0];
}

export async function updateSubscriberById(id, email) {
  const result = await pool.query(
    `
      UPDATE newsletter_subscribers
      SET email = $1
      WHERE id_newsletter_subscriber = $2
      RETURNING
        id_newsletter_subscriber,
        email,
        subscribed_at
    `,
    [email, id]
  );

  return result.rows[0] || null;
}

export async function deleteSubscriberById(id) {
  const result = await pool.query(
    `
      DELETE FROM newsletter_subscribers
      WHERE id_newsletter_subscriber = $1
      RETURNING id_newsletter_subscriber
    `,
    [id]
  );

  return result.rows[0] || null;
}