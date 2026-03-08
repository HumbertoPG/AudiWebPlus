import { pool } from "../config/db.js";

const baseModelSelect = `
  SELECT
    id_car_model,
    model_name,
    model_year,
    base_price,
    description,
    main_image_url,
    fuel_capacity,
    horse_power,
    v_max,
    acceleration,
    cylinders,
    fuel_type
  FROM car_models
`;

export async function findAllCars({ q, year, fuel_type, max_price } = {}) {
  let sql = baseModelSelect;
  const params = [];
  const where = [];

  if (q) {
    params.push(`%${String(q).trim()}%`);
    where.push(`(model_name ILIKE $${params.length} OR COALESCE(description, '') ILIKE $${params.length})`);
  }

  if (year !== undefined && year !== null && year !== "") {
    const parsedYear = Number(year);
    if (Number.isInteger(parsedYear)) {
      params.push(parsedYear);
      where.push(`model_year = $${params.length}`);
    }
  }

  if (fuel_type) {
    params.push(String(fuel_type).trim().toLowerCase());
    where.push(`LOWER(fuel_type) = $${params.length}`);
  }

  if (max_price !== undefined && max_price !== null && max_price !== "") {
    const parsedMaxPrice = Number(max_price);
    if (Number.isFinite(parsedMaxPrice)) {
      params.push(parsedMaxPrice);
      where.push(`base_price <= $${params.length}`);
    }
  }

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  sql += ` ORDER BY model_year DESC, base_price ASC, id_car_model DESC`;

  const result = await pool.query(sql, params);
  return result.rows;
}

export async function findCarById(id) {
  const modelResult = await pool.query(
    `
      ${baseModelSelect}
      WHERE id_car_model = $1
    `,
    [id]
  );

  const model = modelResult.rows[0] || null;

  if (!model) {
    return null;
  }

  const configurations = await findConfigurationsByCarId(id);

  return {
    ...model,
    configurations
  };
}

export async function findConfigurationsByCarId(carModelId) {
  const result = await pool.query(
    `
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
      WHERE car_model_id = $1
      ORDER BY price ASC, id_model_configuration ASC
    `,
    [carModelId]
  );

  return result.rows;
}

export async function insertCar(car) {
  const result = await pool.query(
    `
      INSERT INTO car_models (
        model_name,
        model_year,
        base_price,
        description,
        main_image_url,
        fuel_capacity,
        horse_power,
        v_max,
        acceleration,
        cylinders,
        fuel_type
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING
        id_car_model,
        model_name,
        model_year,
        base_price,
        description,
        main_image_url,
        fuel_capacity,
        horse_power,
        v_max,
        acceleration,
        cylinders,
        fuel_type
    `,
    [
      car.model_name,
      car.model_year,
      car.base_price,
      car.description,
      car.main_image_url,
      car.fuel_capacity,
      car.horse_power,
      car.v_max,
      car.acceleration,
      car.cylinders,
      car.fuel_type
    ]
  );

  return result.rows[0];
}

export async function updateCarById(id, car) {
  const result = await pool.query(
    `
      UPDATE car_models
      SET
        model_name = $1,
        model_year = $2,
        base_price = $3,
        description = $4,
        main_image_url = $5,
        fuel_capacity = $6,
        horse_power = $7,
        v_max = $8,
        acceleration = $9,
        cylinders = $10,
        fuel_type = $11
      WHERE id_car_model = $12
      RETURNING
        id_car_model,
        model_name,
        model_year,
        base_price,
        description,
        main_image_url,
        fuel_capacity,
        horse_power,
        v_max,
        acceleration,
        cylinders,
        fuel_type
    `,
    [
      car.model_name,
      car.model_year,
      car.base_price,
      car.description,
      car.main_image_url,
      car.fuel_capacity,
      car.horse_power,
      car.v_max,
      car.acceleration,
      car.cylinders,
      car.fuel_type,
      id
    ]
  );

  return result.rows[0] || null;
}

export async function deleteCarById(id) {
  const result = await pool.query(
    `
      DELETE FROM car_models
      WHERE id_car_model = $1
      RETURNING id_car_model
    `,
    [id]
  );

  return result.rows[0] || null;
}

export async function runCustomCarsQuery(sql, params = []) {
  const result = await pool.query(sql, params);
  return result.rows;
}