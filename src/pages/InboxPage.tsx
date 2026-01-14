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

// types

export const InboxPage = () => {
  const [taskFormShow, SetTaskFormShow] = useState<boolean>(false)
  const fetcher = useFetcher()
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Inbox - Tasky AI' />

      <TopAppBar
        title='Inbox'
        taskCount={20}
      ></TopAppBar>

      <Page>
        <PageHeader>
          <PageTitle> Inbox </PageTitle>
        </PageHeader>

        <PageList>
          {tasks.rows?.map(
            ({ $id, content, completed, due_date, projectId : project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                dueDate={due_date}
                project={project}
              />
            ),
          )}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => SetTaskFormShow(true)} />
          )}
          {!taskFormShow && <TaskEmpty type='inbox' />}

          {taskFormShow && (
            <TaskForm
              className='mt-1'
              mode='create'
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
