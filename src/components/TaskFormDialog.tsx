// Node Modules
import { useEffect, useState, type FC, type PropsWithChildren } from 'react'
import { startOfToday } from 'date-fns'
import { useFetcher, useLocation } from 'react-router'

// Components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Types
import { TaskForm } from './TaskForm'

export const TaskFormDialog: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()
  const fetcher = useFetcher()

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        const target = event.target as HTMLElement

        if (target.localName === 'textarea') return

        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0 rounded-xl!'>
        <DialogTitle className='hidden' />
        <TaskForm
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            project: null,
          }}
          mode='create'
          onCancel={() => setOpen(false)}
          onSubmit={formData => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'POST',
              encType: 'application/json',
            })

            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
