// Node Modules
import React from 'react'
import { useLoaderData } from 'react-router'

// Components
import { Head } from '@/components/Head'
import { TopAppBar } from '@/components/TopAppBar'
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page'
import { TaskEmpty } from '@/components/TaskEmpty'
import type { Models } from 'appwrite'
import { TaskCard } from '@/components/TaskCard'

// Assets
import { CheckCircle2 } from 'lucide-react'

export const UpcomingTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Upcoming - Tasky AI' />

      <TopAppBar
        title='Upcoming'
        taskCount={tasks.total}
      ></TopAppBar>

      <Page>
        <PageHeader>
          <PageTitle> Upcoming </PageTitle>

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

          {!tasks.total && <TaskEmpty type='upcoming' />}
        </PageList>
      </Page>
    </>
  )
}
