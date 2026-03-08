function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function cleanRawText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function toNullableInteger(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateIntent(rawText) {
  const cleaned = cleanRawText(rawText);
  const parsed = safeJsonParse(cleaned);

  if (!parsed || typeof parsed !== "object") {
    return {
      intent: "unknown",
      filters: {
        model_name: null,
        model_year: null,
        fuel_type: null,
        max_price: null,
        min_horse_power: null
      },
      limit: 5,
      sort: null
    };
  }

  const allowedIntents = new Set([
    "get_model_price",
    "get_model_info",
    "search_models",
    "unknown"
  ]);

  const allowedSorts = new Set(["price_asc", "price_desc", "year_desc", null]);

  const filters = parsed.filters && typeof parsed.filters === "object" ? parsed.filters : {};

  return {
    intent: allowedIntents.has(parsed.intent) ? parsed.intent : "unknown",
    filters: {
      model_name: typeof filters.model_name === "string" ? filters.model_name.trim() : null,
      model_year: toNullableInteger(filters.model_year),
      fuel_type: typeof filters.fuel_type === "string" ? filters.fuel_type.trim().toLowerCase() : null,
      max_price: toNullableNumber(filters.max_price),
      min_horse_power: toNullableInteger(filters.min_horse_power)
    },
    limit: Number.isInteger(parsed.limit) ? Math.min(Math.max(parsed.limit, 1), 10) : 5,
    sort: allowedSorts.has(parsed.sort) ? parsed.sort : null
  };
}