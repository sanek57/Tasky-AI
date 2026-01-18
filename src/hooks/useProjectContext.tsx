import { ProjectContext } from '@/contexts/ProjectContext'
import { useContext } from 'react'

export const useProjectContext = () => useContext(ProjectContext)
