// Node modules
import type { ActionFunction } from 'react-router'

// Custom modules

// Types
import type { Task } from '@/types'
import { ID, tablesDS } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'

const createTask = async (data: Task) => {
  try {
    return await tablesDS.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      rowId: ID.unique(),
      data: { ...data, userId: getUserId() },
    })

    // console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const updateTask = async (data: Task & { $id?: string }) => {
  if (!data.id) {
    throw new Error('Task id not found')
  }

  data.$id = data.id

  delete data.id // for work appWrite

  try {
    return await tablesDS.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      rowId: data.$id,
      data: { ...data, userId: getUserId() },
    })
    // console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task

  if (request.method === 'POST') {
    return await createTask(data)
  }

  if (request.method === 'PUT') {
    return await updateTask(data)
  }
}
