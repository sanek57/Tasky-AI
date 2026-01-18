// Node modules
import { Query, tablesDS } from '@/lib/appwrite'
import { redirect, type LoaderFunction } from 'react-router'

// Custom modules
import { getUserId } from '@/lib/utils'

// Types
import type { Models } from 'appwrite'
import { startOfToday, startOfTomorrow } from 'date-fns'
type TaskCounts = {
  inboxTasks: number
  todayTasks: number
}

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>
  taskCounts: TaskCounts
}

const getProjects = async () => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      queries: [
        Query.orderDesc('$createdAt'), // oreder by last create
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) {
    console.log('Error getting projects', error)
    throw new Error('Error getting projects')
  }
}

const getTaskCounts = async () => {
  const taskCounts: TaskCounts = {
    inboxTasks: 0,
    todayTasks: 0,
  }

  try {
    const { total: totalInbox } = await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.select(['$id']),
        Query.isNull('project'),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId() as string),
      ],
    })
    taskCounts.inboxTasks = totalInbox
  } catch (error) {
    console.log('Error getting inbox task counts', error)
    throw new Error('Error getting inbox task counts')
  }

  try {
    const { total: totalToday } = await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.select(['$id']),
        Query.and([
          Query.greaterThanEqual('due_date', startOfToday().toISOString()),
          Query.lessThan('due_date', startOfTomorrow().toISOString()),
        ]),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId() as string),
      ],
    })
    taskCounts.todayTasks = totalToday
  } catch (error) {
    console.log('Error getting inbox task counts', error)
    throw new Error('Error getting inbox task counts')
  }

  return taskCounts
}

export const appLoader: LoaderFunction = async () => {
  const userId = getUserId()

  if (!userId) return redirect('/login')

  const projects = await getProjects()
  const taskCounts = await getTaskCounts()
  return { projects, taskCounts }
}
