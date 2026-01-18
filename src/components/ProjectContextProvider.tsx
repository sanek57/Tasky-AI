// Node modules
import type { FC } from 'react'

// types
import type { Models } from 'appwrite'
import { ProjectContext } from '@/contexts/ProjectContext'

type ProjectContextProvideProps = {
  project: Models.DocumentList<Models.Document>
  children: React.ReactNode
}

export const ProjectContextProvider: FC<ProjectContextProvideProps> = ({
  project,
  children,
}) => {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}
