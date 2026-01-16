// Node Modules
import React from 'react'
import { useLoaderData } from 'react-router'

// Components
import { Head } from '@/components/Head'
import { TopAppBar } from '@/components/TopAppBar'
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { ProjectFormDialog } from '@/components/ProjectFormDialog'

// Assets
import { Plus } from 'lucide-react'

// Types
import type { Models } from 'appwrite'
import { ProjectCard } from '@/components/ProjectCard'

type DataType = {
  projects: Models.DocumentList<Models.Document>
}

export const ProjectsPage = () => {
  const loaderData = useLoaderData()
  const { projects } = loaderData as DataType

  return (
    <>
      <Head title='My Projects - Tasky AI' />

      <TopAppBar title='My projects'></TopAppBar>

      <Page>
        <PageHeader>
          <div className='flex items-center gap-2'>
            <PageTitle> My Projects </PageTitle>
            <ProjectFormDialog method='POST'>
              <Button
                variant='ghost'
                size='icon'
                className='w-8 h-8'
                aria-label='Create a project'
              >
                <Plus />
              </Button>
            </ProjectFormDialog>
          </div>
        </PageHeader>

        <PageList>
          <div className='h-8 flex items-center border-b'>
            <div className='text-sm'>{projects.total} projects</div>
          </div>
          <div className=''>
            {projects.rows?.map((project: Models.Document) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}
          </div>
        </PageList>
      </Page>
    </>
  )
}
