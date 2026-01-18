// Node modules
import { redirect, type ActionFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'
import { ID, tablesDS } from '@/lib/appwrite'

// Types
import type { Project, ProjectForm } from '@/types'
import { generateProjectTasks } from '@/api/openRouterAi'
import type { aiGenTask } from '@/lib/openRouterAi'

const createProject = async (data: ProjectForm) => {
  const aiTaskGen = data.ai_task_gen
  const taskGenPrompt = data.task_gen_prompt
  let aiGeneratingTasks: aiGenTask[] | undefined = []

  try {
    const project = await tablesDS.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      rowId: ID.unique(),
      data: {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    })

    if (aiTaskGen) {
      try {
        aiGeneratingTasks = await generateProjectTasks(taskGenPrompt)
      } catch (error) {
        console.log('Error generating answer', error)
      }
    }

    if (aiGeneratingTasks) {
      if (aiGeneratingTasks.length > 0) {
        const promises = aiGeneratingTasks?.map(task => {
          return tablesDS.createRow({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            tableId: 'tasks',
            rowId: ID.unique(),
            data: {
              ...task,
              project: project?.$id,
              userId: getUserId(),
            },
          })
        })

        try {
          await Promise.all(promises)
        } catch (error) {
          console.log('Error creating project tasks by aiGen', error)
        }
      }
    }

    return redirect(`/app/projects/${project.$id}`)
  } catch (error) {
    console.log(error)
  }
}

const deleteProject = async (data: Project & { $id?: string }) => {
  if (!data.id) {
    throw new Error('Project id not found')
  }

  data.$id = data.id

  delete data.id // for work appWrite
  try {
    await tablesDS.deleteRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      rowId: data.$id,
    })
  } catch (error) {
    console.log('Error deleting project:', error)
  }
}

const updateProject = async (data: Project & { $id?: string }) => {
  if (!data.id) {
    throw new Error('Project id not found')
  }

  data.$id = data.id

  delete data.id // for work appWrite

  try {
    return await tablesDS.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: 'projects',
      rowId: data.$id,
      data: {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
      },
    })
  } catch (error) {
    console.log('Error updating project:', error)
  }
}

export const projectAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as ProjectForm

  if (request.method === 'POST') {
    return await createProject(data)
  }

  if (request.method === 'PUT') {
    return await updateProject(data)
  }

  if (request.method === 'DELETE') {
    return await deleteProject(data)
  }

  throw new Error('Invalid method')
}
