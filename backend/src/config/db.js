import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const isNeon = databaseUrl.includes("neon.tech");

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl:
    process.env.DB_SSL === "false"
      ? false
      : isNeon
        ? { rejectUnauthorized: false }
        : false
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});