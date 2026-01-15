import { callOpenRouter } from '@/lib/openRouterAi'

export const generateProjectTasks = async (prompt: string)=> {
  try {
    const today = new Date().toISOString().split('T')[0]
    return await callOpenRouter([
      {
        role: 'system',
        content:
          // 'Generate and return a list of tasks based on the provided prompt and the given JSON schema',
          `Ты помогаешь разбивать проекты на задачи.

            Возвращай ТОЛЬКО JSON массив в таком формате:

            [
              {
                "content": "Подготовить техническое задание",
                "due_date": "${today}"
              },
              {
                "content": "Сделать дизайн главной страницы",
                "due_date": null
              }
            ]

            Правила:
            • due_date — в формате YYYY-MM-DD или null
            • даты указывай относительно сегодняшнего дня (${today})
            • возвращай ТОЛЬКО валидный JSON, без markdown, без объяснений, без \`\`\`json
            `,
      },
      {
        role: 'user',
        content: prompt
          ? `Prompt: ${prompt}`
          : 'Сгенерируй пример задач для проекта',
      },
    ])
  } catch (error) {
    console.log('Error generating tasks: ', error)
  }
}
