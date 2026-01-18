type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type aiGenTask = {
  content: string,
  due_date: Date | null
}

export async function callOpenRouter(
  messages: Message[],
  model = 'anthropic/claude-3.7-sonnet',
): Promise<aiGenTask[]> {
  const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY

  if (!apiKey && import.meta.env.DEV) {
    throw new Error(
      'Нет API ключа в .env.local → добавь VITE_OPEN_ROUTER_API_KEY',
    )
  }

  const response = await fetch('/api/openrouter/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin, // помогает в приоритете
      'X-Title': 'My Vite React App',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1200,
      stream: false,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenRouter ошибка: ${response.status} — ${err}`)
  }
  
  const data = await response.json()
  return JSON.parse(data.choices[0]?.message?.content) || []
}
