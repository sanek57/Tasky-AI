// Node Modules
import React, { useCallback, useRef, useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

// Components
import { Head } from '@/components/Head'
import { TopAppBar } from '@/components/TopAppBar'
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { ProjectFormDialog } from '@/components/ProjectFormDialog'
import {
  ProjectSearchField,
  type SearchingState,
} from '@/components/ProjectSearchField'

// Assets
import { Plus } from 'lucide-react'

// Types
import type { Models } from 'appwrite'
import { ProjectCard } from '@/components/ProjectCard'
import { cn } from '@/lib/utils'

type DataType = {
  projects: Models.DocumentList<Models.Document>
}

export const ProjectsPage = () => {
  const fetcher = useFetcher()
  const fetcherData = fetcher.data as DataType
  const loaderData = useLoaderData() as DataType

  const [searchingState, setSearchingState] = useState<SearchingState>('idle')

  const { projects } = fetcherData || loaderData

  const searchTimerId = useRef<number>(-1)

  const handleProjectSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (searchTimerId.current) {
        clearTimeout(searchTimerId.current)
      }

      const submitTarget = event.currentTarget.form
      searchTimerId.current = setTimeout(async () => {
        setSearchingState('searching')
        await fetcher.submit(submitTarget)
        setSearchingState('idle')
      }, 500)
      setSearchingState('loading')
    },
    [],
  )

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

          <fetcher.Form
            method='GET'
            action='/app/projects'
          >
            <ProjectSearchField
              searchingState={searchingState}
              handleChange={handleProjectSearch}
            />
          </fetcher.Form>
        </PageHeader>

        <PageList>
          <div className='h-8 flex items-center border-b'>
            <div className='text-sm'>{projects.total} projects</div>
          </div>
          <div className={cn(searchingState === 'searching' && 'opacity-25')}>
            {projects.rows?.map((project: Models.Document) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}

            {projects.total === 0 && (
              <div className="h-14 flex justify-center items-center text-muted-foreground">
                No project found
              </div>
            )}
          </div>
        </PageList>
      </Page>
    </>
  )
}
