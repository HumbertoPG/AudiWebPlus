export function buildCarsQuery(intentData) {
  const { intent, filters, limit, sort } = intentData;

  let sql = `
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

  const where = [];
  const params = [];

  if (filters.model_name) {
    params.push(`%${filters.model_name}%`);
    where.push(`model_name ILIKE $${params.length}`);
  }

  if (filters.model_year) {
    params.push(filters.model_year);
    where.push(`model_year = $${params.length}`);
  }

  if (filters.fuel_type) {
    params.push(filters.fuel_type.toLowerCase());
    where.push(`LOWER(fuel_type) = $${params.length}`);
  }

  if (filters.max_price !== null && filters.max_price !== undefined) {
    params.push(filters.max_price);
    where.push(`base_price <= $${params.length}`);
  }

  if (filters.min_horse_power !== null && filters.min_horse_power !== undefined) {
    params.push(filters.min_horse_power);
    where.push(`horse_power >= $${params.length}`);
  }

  if (where.length) {
    sql += ` WHERE ${where.join(" AND ")}`;
  }

  if (intent === "get_model_price" || intent === "get_model_info") {
    sql += ` ORDER BY model_year DESC, base_price ASC`;
    sql += ` LIMIT 1`;
    return { sql, params };
  }

  if (sort === "price_asc") {
    sql += ` ORDER BY base_price ASC`;
  } else if (sort === "price_desc") {
    sql += ` ORDER BY base_price DESC`;
  } else if (sort === "year_desc") {
    sql += ` ORDER BY model_year DESC`;
  } else {
    sql += ` ORDER BY model_year DESC, base_price ASC`;
  }

  params.push(limit || 5);
  sql += ` LIMIT $${params.length}`;

  return { sql, params };
}