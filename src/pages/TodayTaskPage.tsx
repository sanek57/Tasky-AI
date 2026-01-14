// Node Modules
import React, { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

// Components
import { Head } from '@/components/Head'
import { TopAppBar } from '@/components/TopAppBar'
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page'
import { TaskCreateButton } from '@/components/TaskCreateButton'
import { TaskEmpty } from '@/components/TaskEmpty'
import { TaskForm } from '@/components/TaskForm'
import type { Models } from 'appwrite'
import { TaskCard } from '@/components/TaskCard'
import { TaskCardSkeleton } from '@/components/TaskCardSkeleton'

// Assets
import { CheckCircle2 } from 'lucide-react'

// Custom modules
import { startOfToday } from 'date-fns'

export const TodayTaskPage = () => {
  const [taskFormShow, SetTaskFormShow] = useState<boolean>(false)
  const fetcher = useFetcher()
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Today - Tasky AI' />

      <TopAppBar
        title='Today'
        taskCount={tasks.total}
      ></TopAppBar>

      <Page>
        <PageHeader>
          <PageTitle> Today </PageTitle>

          {tasks.total > 0 && (
            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
              <CheckCircle2 size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
          {tasks.rows?.map(({ $id, content, completed, due_date, project }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => SetTaskFormShow(true)} />
          )}

          {!tasks.total && !taskFormShow && <TaskEmpty />}

          {taskFormShow && (
            <TaskForm
              className='mt-1'
              mode='create'
              defaultFormData={{
                content: '',
                due_date: startOfToday(),
                project: null,
              }}
              onCancel={() => SetTaskFormShow(false)}
              onSubmit={formData => {
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                })

                SetTaskFormShow(false)
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  )
}
