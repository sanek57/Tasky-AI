// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
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
    console.log(error)
    throw new Error('Error getting projects')
  }
}

export const projectsLoader: LoaderFunction = async () => {
  const projects = await getProjects()
  return { projects }
}
