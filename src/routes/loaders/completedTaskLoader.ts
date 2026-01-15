// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'

const getTasks = async () => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.equal('completed', true),
        Query.orderDesc('$updatedAt'), // oreder by last updated
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error getting completed tasks')
  }
}

export const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}
