import { callOllama } from "../llm/ollama.js";

export async function interpretUserMessage(message) {
  const systemPrompt = `
Eres un parser de intención para un catálogo de modelos de autos.
Tu única tarea es convertir la pregunta del usuario en JSON válido.
NO expliques nada. NO uses markdown. NO uses bloques de código.
Responde exclusivamente con un objeto JSON.

Esquema permitido:
{
  "intent": "get_model_price" | "get_model_info" | "search_models" | "unknown",
  "filters": {
    "model_name": string | null,
    "model_year": number | null,
    "fuel_type": string | null,
    "max_price": number | null,
    "min_horse_power": number | null
  },
  "limit": number | null,
  "sort": "price_asc" | "price_desc" | "year_desc" | null
}

Reglas:
- Si preguntan el precio de un modelo, usa intent = "get_model_price".
- Si preguntan información o especificaciones de un modelo, usa intent = "get_model_info".
- Si piden listar o buscar varios modelos, usa intent = "search_models".
- Si no puedes inferir algo, usa null.
- Si no entiendes la petición, usa intent = "unknown".
- limit debe ser un entero pequeño entre 1 y 10 cuando aplique.

Ejemplos:
Pregunta: "¿Cuánto cuesta el A3 2024?"
Respuesta:
{
  "intent": "get_model_price",
  "filters": {
    "model_name": "A3",
    "model_year": 2024,
    "fuel_type": null,
    "max_price": null,
    "min_horse_power": null
  },
  "limit": 1,
  "sort": null
}

Pregunta: "Muéstrame modelos gasolina menores a 900000"
Respuesta:
{
  "intent": "search_models",
  "filters": {
    "model_name": null,
    "model_year": null,
    "fuel_type": "gasolina",
    "max_price": 900000,
    "min_horse_power": null
  },
  "limit": 5,
  "sort": "price_asc"
}
`;

  const userPrompt = `Pregunta del usuario: ${message}`;

  return await callOllama([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ]);
}