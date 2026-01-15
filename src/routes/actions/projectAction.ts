// Node modules
import { redirect, type ActionFunction } from 'react-router'

// Custom Modules
import { getUserId } from '@/lib/utils'
import { ID, tablesDS } from '@/lib/appwrite'

// Types
import type { ProjectForm } from '@/types'

const createProject = async (data: ProjectForm) => {
  
  const aiTaskGen = data.ai_task_gen
  const taskGenPrompt = data.task_gen_prompt

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
    return redirect(`/app/projects/${project.$id}`)
  } catch (error) {
    console.log(error)
  }
}

// const updateTask = async (data: Task & { $id?: string }) => {
//   if (!data.id) {
//     throw new Error('Task id not found')
//   }

//   data.$id = data.id

//   delete data.id // for work appWrite

//   try {
//     return await tablesDS.updateRow({
//       databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//       tableId: 'tasks',
//       rowId: data.$id,
//       data: { ...data, userId: getUserId() },
//     })
//     // console.log(response)
//   } catch (error) {
//     console.log(error)
//   }
// }

export const projectAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as ProjectForm

  if (request.method === 'POST') {
    return await createProject(data)
  }

  if (request.method === 'PUT') {
    // return await updateTask(data)
  }
}
