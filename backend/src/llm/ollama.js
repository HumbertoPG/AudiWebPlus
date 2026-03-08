const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://host.docker.internal:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

export async function callOllama(messages, options = {}) {
  const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: {
        temperature: 0.1,
        ...options
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama error: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data?.message?.content || "";
}