// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'
import type { Models } from 'appwrite'

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>
}

const getProjects = async (query: string) => {
  try {
    return await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      queries: [
        Query.contains('name', query),
        Query.orderDesc('$createdAt'), // oreder by last create
        Query.equal('userId', getUserId() as string), // tasks for current user
      ],
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error getting projects')
  }
}

export const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''

  const projects = await getProjects(query)
  return { projects }
}
