import express from "express";
import cors from "cors";
import fs from "fs";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa DB al arrancar (simple para proyecto escolar)
(async () => {
  const sql = fs.readFileSync("src/init.sql", "utf-8");
  await pool.query(sql);
  console.log("DB initialized");
})().catch(err => console.error("DB init error:", err));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/cars", async (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const year = req.query.year ? Number(req.query.year) : null;

  let query = "SELECT * FROM cars";
  const params = [];
  const where = [];

  if (q) {
    params.push(`%${q}%`);
    where.push(`LOWER(brand || ' ' || model) LIKE $${params.length}`);
  }
  if (year) {
    params.push(year);
    where.push(`year = $${params.length}`);
  }
  if (where.length) query += " WHERE " + where.join(" AND ");
  query += " ORDER BY id DESC";

  const result = await pool.query(query, params);
  res.json(result.rows);
});

// CRUD mínimo
app.post("/cars", async (req, res) => {
  const { brand, model, year, price_mxn } = req.body || {};
  if (!brand || !model || !year || !price_mxn) {
    return res.status(400).json({ error: "brand, model, year, price_mxn required" });
  }
  const result = await pool.query(
    "INSERT INTO cars (brand, model, year, price_mxn) VALUES ($1,$2,$3,$4) RETURNING *",
    [brand, model, Number(year), Number(price_mxn)]
  );
  res.status(201).json(result.rows[0]);
});

app.put("/cars/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { brand, model, year, price_mxn } = req.body || {};
  const result = await pool.query(
    "UPDATE cars SET brand=$1, model=$2, year=$3, price_mxn=$4 WHERE id=$5 RETURNING *",
    [brand, model, Number(year), Number(price_mxn), id]
  );
  if (!result.rows.length) return res.status(404).json({ error: "not found" });
  res.json(result.rows[0]);
});

app.delete("/cars/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("DELETE FROM cars WHERE id=$1 RETURNING id", [id]);
  if (!result.rows.length) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});

// Chatbot mínimo (consulta DB por “precio”)
app.post("/chat", async (req, res) => {
  const message = (req.body?.message || "").toString().trim().toLowerCase();
  if (!message) return res.status(400).json({ error: "message required" });

  if (message.includes("precio")) {
    const { rows } = await pool.query("SELECT * FROM cars");
    const found = rows.find(c =>
      message.includes(c.model.toLowerCase()) && message.includes(String(c.year))
    );
    if (found) {
      return res.json({
        answer: `El ${found.brand} ${found.model} ${found.year} cuesta aprox $${Number(found.price_mxn).toLocaleString("es-MX")} MXN (ejemplo).`
      });
    }
    return res.json({ answer: "No encontré ese auto. Prueba: 'precio del Yaris 2021'." });
  }

  res.json({ answer: "Hola 🙂 Pregunta por precios como: 'precio del Versa 2022'." });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Backend running on 3001");
});