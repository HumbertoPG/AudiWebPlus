import { pool } from "../config/db.js";

export const getUsedCarById = async (id) => {
  const query = "SELECT * FROM public.used_cars WHERE id_used_car = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getAllUsedCars = async () => {
  const query = "SELECT * FROM public.used_cars ORDER BY id_used_car DESC";
  const { rows } = await pool.query(query);
  console.log("ROWS used_cars:", rows);
  return rows;
};