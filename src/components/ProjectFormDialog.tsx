// Node modules
import React, { useState, type FC } from 'react'
import { useFetcher } from 'react-router'

// Components
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ProjectForm } from './ProjectForm'
import { toast } from 'sonner'

// Types
import type { Project } from '@/types'

type ProjectFormDialogProps = {
  defaultFormData?: Project
  children: React.ReactNode
  method: 'POST' | 'PUT'
}

export const ProjectFormDialog: FC<ProjectFormDialogProps> = ({
  children,
  defaultFormData,
  method,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const fetcher = useFetcher()

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0 rounded-xl!'>
        <DialogTitle className='hidden' />
        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async formData => {
            setOpen(false)

            toast.promise(
              () =>
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app/projects',
                  method,
                  encType: 'application/json',
                }),
              {
                loading: `${method === 'POST' ? 'Creating' : 'Updating'} project...`,
              },
            )
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
