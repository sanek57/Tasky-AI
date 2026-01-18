// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'
import { startOfToday, startOfTomorrow } from 'date-fns'

const getTasks = async () => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.equal('completed', false),
        Query.and([// tasks for today
            Query.greaterThanEqual('due_date', startOfToday().toISOString()), 
            Query.lessThanEqual('due_date', startOfTomorrow().toISOString()), 
        ]),
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) { 
    console.log(error)
    throw new Error('Error getting today tasks')
  }
}

export const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}
