export async function callASI(prompt: string, system?: string): Promise<string> {
  const apiKey = process.env.ASI_ONE_API_KEY || "";
  const baseUrl = process.env.ASI_ONE_BASE_URL || "https://api.asi1.ai/v1";
  const model = process.env.ASI_ONE_MODEL || "asi1-mini";

  if (!apiKey) return "[Dignity Guard Mode — ASI:ONE tidak terkonfigurasi]";

  try {
    const messages: { role: string; content: string }[] = [];
    if (system) messages.push({ role: "system", content: system });
    messages.push({ role: "user", content: prompt });

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return `[ASI:ONE error: ${res.status} — ${err.slice(0, 100)}]`;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (e: any) {
    return `[ASI:ONE error: ${e.message || e}]`;
  }
}
