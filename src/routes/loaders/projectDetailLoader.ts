// Node Modules
import { Query, tablesDS } from '@/lib/appwrite'
import type { LoaderFunction } from 'react-router'

const getProject = async (projectId: string) => {
  try {
    // Сначала получаем проект (без tasks или с минимальными данными)
    const projectResponse = await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      queries: [
        Query.equal('$id', projectId),
        Query.select(['*']), // без 'tasks.*' чтобы не нагружать
      ],
    })

    // Потом отдельно все задачи этого проекта
    const tasksResponse = await tablesDS.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'tasks',
      queries: [
        Query.equal('project', projectId), // или project.$id — зависит от типа связи
        Query.orderDesc('$createdAt'), // сортировка по дате создания
        Query.limit(100), // сколько нужно — можно больше
      ],
    })

    return { projectResponse, tasksResponse }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error('Error getting project')
  }
}

export const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string }

  const project = await getProject(projectId)
  return { project: project.projectResponse, tasks: project.tasksResponse }
}
