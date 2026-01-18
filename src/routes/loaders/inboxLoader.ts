// Node Modules

import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'

// Types

const getTasks = async () => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.equal('completed', false),
        // Query.isNull('project'), // tasks without a project - не работате на связных таблицах в appwrite
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error getting inbox tasks')
  }
}

export const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}
