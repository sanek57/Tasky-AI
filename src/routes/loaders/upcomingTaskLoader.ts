// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'
import { startOfTomorrow } from 'date-fns'

const getTasks = async () => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.equal('completed', false),
        Query.isNotNull('due_date'),
        Query.greaterThanEqual('due_date', startOfTomorrow().toISOString()),
        Query.orderAsc('due_date'),
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error getting upcoming tasks')
  }
}

export const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}
