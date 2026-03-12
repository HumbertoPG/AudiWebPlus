import { pool } from "../config/db.js";

const baseSelect = `
  SELECT
    id_model_configuration,
    car_model_id,
    configuration_name,
    price,
    description,
    equipment,
    fuel_type,
    image_url,
    trunk_volume,
    acceleration
  FROM model_configurations
`;

export async function findAllConfigurations({ car_model_id } = {}) {
  let sql = baseSelect;
  const params = [];
  const where = [];

  if (car_model_id !== undefined && car_model_id !== null && car_model_id !== "") {
    const parsed = Number(car_model_id);
    if (Number.isInteger(parsed) && parsed > 0) {
      params.push(parsed);
      where.push(`car_model_id = $${params.length}`);
    }
  }

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  sql += ` ORDER BY car_model_id ASC, price ASC, id_model_configuration ASC`;

  const result = await pool.query(sql, params);
  return result.rows;
}

export async function findConfigurationById(id) {
  const result = await pool.query(
    `
      ${baseSelect}
      WHERE id_model_configuration = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function insertConfiguration(data) {
  const result = await pool.query(
    `
      INSERT INTO model_configurations (
        car_model_id,
        configuration_name,
        price,
        description,
        equipment,
        fuel_type,
        image_url,
        trunk_volume,
        acceleration
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING
        id_model_configuration,
        car_model_id,
        configuration_name,
        price,
        description,
        equipment,
        fuel_type,
        image_url,
        trunk_volume,
        acceleration
    `,
    [
      data.car_model_id,
      data.configuration_name,
      data.price,
      data.description,
      data.equipment,
      data.fuel_type,
      data.image_url,
      data.trunk_volume,
      data.acceleration
    ]
  );

  return result.rows[0];
}

export async function updateConfigurationById(id, data) {
  const result = await pool.query(
    `
      UPDATE model_configurations
      SET
        car_model_id = $1,
        configuration_name = $2,
        price = $3,
        description = $4,
        equipment = $5,
        fuel_type = $6,
        image_url = $7,
        trunk_volume = $8,
        acceleration = $9
      WHERE id_model_configuration = $10
      RETURNING
        id_model_configuration,
        car_model_id,
        configuration_name,
        price,
        description,
        equipment,
        fuel_type,
        image_url,
        trunk_volume,
        acceleration
    `,
    [
      data.car_model_id,
      data.configuration_name,
      data.price,
      data.description,
      data.equipment,
      data.fuel_type,
      data.image_url,
      data.trunk_volume,
      data.acceleration,
      id
    ]
  );

  return result.rows[0] || null;
}

export async function deleteConfigurationById(id) {
  const result = await pool.query(
    `
      DELETE FROM model_configurations
      WHERE id_model_configuration = $1
      RETURNING id_model_configuration
    `,
    [id]
  );

  return result.rows[0] || null;
}