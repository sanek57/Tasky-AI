// Node modules
import type { ActionFunction } from 'react-router'

// Types
import type { Task } from '@/types'

const createTask = async (data: Task) => {
    try {
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task

  if (request.method === 'POST') {
    return await createTask(data)
  }
}
