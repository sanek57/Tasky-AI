// Node modules
import React, { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

// Components
import { Head } from '@/components/Head'
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page'
import { TopAppBar } from '@/components/TopAppBar'
import { Button } from '@/components/ui/button'
import { ProjectActionMenu } from '@/components/ProjectActionMenu'
import { TaskCardSkeleton } from '@/components/TaskCardSkeleton'
import { TaskCard } from '@/components/TaskCard'

// Assets
import { MoreHorizontal } from 'lucide-react'

// Types
import type { Models } from 'appwrite'
import type { Project, Task } from '@/types'
import { TaskCreateButton } from '@/components/TaskCreateButton'
import { TaskEmpty } from '@/components/TaskEmpty'
import { TaskForm } from '@/components/TaskForm'

export const ProjectDetailPage = () => {
  const fetcher = useFetcher()
  const { project, tasks } = useLoaderData<{
    project: Models.Document
    tasks: Models.Document
  }>()

  const projectI: Project & Models.Document = project.rows?.[0]
  const projectTask: Task[] = tasks.rows
    ?.filter(i => !i?.completed)
    .sort((a, b) => {
      return a?.due_date < b?.due_date ? -1 : 1
    })

  const [taskFormShow, setTaskFormShow] = useState<boolean>(false)

  return (
    <>
      <Head title={projectI.name + ' - Tasky AI'} />
      <TopAppBar title={projectI.name} />

      <Page>
        <PageHeader>
          <div className='flex items-center gap-2'>
            <PageTitle> {projectI.name} </PageTitle>
            <ProjectActionMenu
              defaultFormData={{
                id: projectI.id,
                name: projectI.name,
                color_name: projectI.color_name,
                color_hex: projectI.color_hex,
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='w-8 h-8 shrink-0'
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>
        <PageList>
          {projectTask.map(({ $id, content, due_date, completed }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              dueDate={due_date}
              completed={completed}
            ></TaskCard>
          ))}
          {fetcher.state !== 'idle' && <TaskCardSkeleton />}
          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}
          {!projectTask.length && !taskFormShow && <TaskEmpty type='project' />}
          {taskFormShow && (
            <TaskForm
              className='mt-1'
              mode='create'
              defaultFormData={{
                content: '',
                due_date: null,
                project: projectI.$id,
              }}
              onCancel={() => setTaskFormShow(false)}
              onSubmit={formData => {
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                })

                setTaskFormShow(false)
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  )
}
