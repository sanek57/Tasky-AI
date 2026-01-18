// Node modules
import { Query, tablesDS } from '@/lib/appwrite'
import { redirect, type LoaderFunction } from 'react-router'

// Custom modules
import { getUserId } from '@/lib/utils'

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

export const appLoader: LoaderFunction = async () => {
  const userId = getUserId()

  if (!userId) return redirect('/login')

  const projects = await getProjects()
  return { projects }
}
