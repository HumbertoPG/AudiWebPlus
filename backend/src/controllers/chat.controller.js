import { interpretUserMessage } from "../chat/interpret.js";
import { validateIntent } from "../chat/validate.js";
import { buildCarsQuery } from "../chat/queryBuilder.js";
import { generateFinalAnswer } from "../chat/answer.js";
import { runCustomCarsQuery } from "../repositories/car.repository.js";

function buildFallbackAnswer(rows) {
  if (!rows.length) {
    return "No encontré modelos que coincidan con tu búsqueda en la base de datos.";
  }

  const lines = rows.slice(0, 5).map((car) => {
    const price = Number(car.base_price).toLocaleString("es-MX");
    const hp = car.horse_power ? `, ${car.horse_power} hp` : "";
    return `- ${car.model_name} ${car.model_year} — $${price} MXN (${car.fuel_type}${hp})`;
  });

  return `Encontré estos modelos:\n${lines.join("\n")}`;
}

export async function handleChat(req, res, next) {
  try {
    const userMessage = (req.body?.message || "").toString().trim();

    if (!userMessage) {
      return res.status(400).json({ error: "message required" });
    }

    const rawLlmOutput = await interpretUserMessage(userMessage);
    const intentData = validateIntent(rawLlmOutput);

    if (intentData.intent === "unknown") {
      return res.json({
        answer:
          "No entendí completamente tu solicitud. Pregunta por nombre del modelo, año, precio, combustible o potencia.",
        debug: {
          rawLlmOutput,
          intentData
        }
      });
    }

    const { sql, params } = buildCarsQuery(intentData);
    const rows = await runCustomCarsQuery(sql, params);

    let answer;

    try {
      answer = await generateFinalAnswer(userMessage, intentData, rows);
    } catch (llmError) {
      console.error("Final answer generation error:", llmError);
      answer = buildFallbackAnswer(rows);
    }

    res.json({
      answer,
      debug: {
        rawLlmOutput,
        intentData,
        sql,
        params,
        rows
      }
    });
  } catch (error) {
    console.error("Chat error:", error);
    next(error);
  }
}