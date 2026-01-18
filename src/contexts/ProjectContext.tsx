import type { Models } from 'appwrite'
import { createContext } from 'react'

export const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null)
