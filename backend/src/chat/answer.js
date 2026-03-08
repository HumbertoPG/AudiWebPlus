import { callOllama } from "../llm/ollama.js";

export async function generateFinalAnswer(userMessage, intentData, rows) {
  if (!rows.length) {
    return "No encontré modelos que coincidan con tu búsqueda en la base de datos.";
  }

  const systemPrompt = `
Eres un asistente útil para una agencia/concesionaria de autos.
Responde usando únicamente la información proporcionada por la base de datos.
No inventes especificaciones.
Si hablas de precios, indícalos en MXN.
Sé claro, breve y natural.
`;

  const userPrompt = `
Pregunta original:
${userMessage}

Intención interpretada:
${JSON.stringify(intentData, null, 2)}

Resultados de base de datos:
${JSON.stringify(rows, null, 2)}

Redacta una respuesta final para el usuario.
`;

  return await callOllama([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ]);
}