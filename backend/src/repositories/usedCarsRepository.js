import { pool } from "../config/db.js";

const baseSelect = `
  SELECT
    id_used_car,
    model_name,
    odometer_km,
    price,
    color,
    engine,
    fuel_type,
    description,
    main_image_url,
    model_year,
    horse_power,
    drivetrain,
    transmission
  FROM used_cars
`;

export async function findAllUsedCars({
  q,
  fuel_type,
  model_year,
  min_price,
  max_price,
  max_odometer_km
} = {}) {
  let sql = baseSelect;
  const params = [];
  const where = [];

  if (q) {
    params.push(`%${String(q).trim()}%`);
    where.push(`(model_name ILIKE $${params.length} OR COALESCE(description, '') ILIKE $${params.length})`);
  }

  if (fuel_type) {
    params.push(String(fuel_type).trim().toLowerCase());
    where.push(`LOWER(COALESCE(fuel_type, '')) = $${params.length}`);
  }

  if (model_year !== undefined && model_year !== null && model_year !== "") {
    const parsed = Number(model_year);
    if (Number.isInteger(parsed)) {
      params.push(parsed);
      where.push(`model_year = $${params.length}`);
    }
  }

  if (min_price !== undefined && min_price !== null && min_price !== "") {
    const parsed = Number(min_price);
    if (Number.isFinite(parsed)) {
      params.push(parsed);
      where.push(`price >= $${params.length}`);
    }
  }

  if (max_price !== undefined && max_price !== null && max_price !== "") {
    const parsed = Number(max_price);
    if (Number.isFinite(parsed)) {
      params.push(parsed);
      where.push(`price <= $${params.length}`);
    }
  }

  if (max_odometer_km !== undefined && max_odometer_km !== null && max_odometer_km !== "") {
    const parsed = Number(max_odometer_km);
    if (Number.isInteger(parsed)) {
      params.push(parsed);
      where.push(`odometer_km <= $${params.length}`);
    }
  }

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  sql += ` ORDER BY id_used_car DESC`;

  const result = await pool.query(sql, params);
  return result.rows;
}

export async function findUsedCarById(id) {
  const result = await pool.query(
    `
      ${baseSelect}
      WHERE id_used_car = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function insertUsedCar(data) {
  const result = await pool.query(
    `
      INSERT INTO used_cars (
        model_name,
        odometer_km,
        price,
        color,
        engine,
        fuel_type,
        description,
        main_image_url,
        model_year,
        horse_power,
        drivetrain,
        transmission
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING
        id_used_car,
        model_name,
        odometer_km,
        price,
        color,
        engine,
        fuel_type,
        description,
        main_image_url,
        model_year,
        horse_power,
        drivetrain,
        transmission
    `,
    [
      data.model_name,
      data.odometer_km,
      data.price,
      data.color,
      data.engine,
      data.fuel_type,
      data.description,
      data.main_image_url,
      data.model_year,
      data.horse_power,
      data.drivetrain,
      data.transmission
    ]
  );

  return result.rows[0];
}

export async function updateUsedCarById(id, data) {
  const result = await pool.query(
    `
      UPDATE used_cars
      SET
        model_name = $1,
        odometer_km = $2,
        price = $3,
        color = $4,
        engine = $5,
        fuel_type = $6,
        description = $7,
        main_image_url = $8,
        model_year = $9,
        horse_power = $10,
        drivetrain = $11,
        transmission = $12
      WHERE id_used_car = $13
      RETURNING
        id_used_car,
        model_name,
        odometer_km,
        price,
        color,
        engine,
        fuel_type,
        description,
        main_image_url,
        model_year,
        horse_power,
        drivetrain,
        transmission
    `,
    [
      data.model_name,
      data.odometer_km,
      data.price,
      data.color,
      data.engine,
      data.fuel_type,
      data.description,
      data.main_image_url,
      data.model_year,
      data.horse_power,
      data.drivetrain,
      data.transmission,
      id
    ]
  );

  return result.rows[0] || null;
}

export async function deleteUsedCarById(id) {
  const result = await pool.query(
    `
      DELETE FROM used_cars
      WHERE id_used_car = $1
      RETURNING id_used_car
    `,
    [id]
  );

  return result.rows[0] || null;
}