// Node modules
import React, { useCallback, type FC } from 'react'
import { useFetcher } from 'react-router'

// Custom modules
import { trancateString } from '@/lib/utils'

// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

// Assets
import { Trash2 } from 'lucide-react'

// Types
import type { Project } from '@/types'
import { toast } from 'sonner'

type ProjectDeleteButtonProps = {
  defaultFormData: Project
}

export const ProjectDeleteButton: FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher()

  const handleProjectDelete = useCallback(() => {

    try {
      toast.promise(
        () =>
          fetcher.submit(defaultFormData, {
            action: '/app/projects',
            method: 'DELETE',
            encType: 'application/json',
          }),
        {
          loading: 'Deleting project...',
          success: 'Project deleted successfully',
          error: 'Error deleting project',
        },
      )
    } catch (error) {
      console.log('Error deleting project ', error)
    }
  }, [defaultFormData])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start text-destructive!'
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project ?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{trancateString(defaultFormData.name)}</strong> project
            and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
