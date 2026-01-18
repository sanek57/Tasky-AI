// Node Modules
import React, { useCallback, useState, type FC } from 'react'
import { useFetcher, useLocation } from 'react-router'

// Custom Modules
import {
  cn,
  formatCustomDate,
  getTaskDueDateColorClass,
  trancateString,
} from '@/lib/utils'

// Components
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { TaskForm } from './TaskForm'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { toast } from 'sonner'

// Assets
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react'

// Types
import type { Task } from '@/types'
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

type TaskCardProps = {
  id: string
  content: string
  completed: boolean
  dueDate: Date
  project: string | null
}

export const TaskCard: FC<TaskCardProps> = ({
  id,
  completed,
  content,
  dueDate,
  project,
}) => {
  const [taskFormShow, setTaskFormShow] = useState<boolean>(false)
  const fetcher = useFetcher()
  const location = useLocation()

  const fetchTask = fetcher.json as Task

  const task: Task = Object.assign(
    {
      id,
      content,
      completed,
      due_date: dueDate,
      project,
    },
    fetchTask,
  )
  const handleTaskComplete = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(
        JSON.stringify({
          id: task.id,
          completed,
        }),
        {
          action: '/app',
          method: 'PUT',
          encType: 'application/json',
        },
      )
    },
    [task.id, fetcher],
  )

  return (
    <>
      {!taskFormShow && (
        <div className='group/card relative grid grid-cols-[max-content_minmax(0,1fr)] gap-3 border-b'>
          <Button
            variant='outline'
            size='icon'
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              task.completed && 'bg-border',
            )}
            role='checkbox'
            aria-checked={task.completed}
            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
            aria-describedby='task-content'
            onClick={async () => {
              await handleTaskComplete(!task.completed)
              if (!task.completed) {
                toast('Task completed', {
                  description: '',
                  action: {
                    label: 'Undo',
                    onClick: handleTaskComplete.bind(null, false), // можно через async/await
                  },
                })
              }
            }}
          >
            <Check
              strokeWidth={4}
              className={cn(
                'w-3! h-3! text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                task.completed ? 'opacity-100' : 'opacity-0',
              )}
            />
          </Button>

          <Card className='rounded-none py-2 space-y-1.5 gap-0 border-none'>
            <CardContent className='p-0'>
              <p
                //           aria-describedby='task-content' - для того что скрин ридер считал это при чтении атрибутов Button
                id='task-content'
                className={cn(
                  'text-sm max-md:me-16',
                  task.completed && 'text-muted-foreground line-through',
                )}
              >
                {task.content}
              </p>
            </CardContent>
            <CardFooter className='p-0 flex gap-4'>
              {task.due_date && location.pathname !== '/app/today' && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(task.due_date, task.completed),
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(task.due_date)}
                </div>
              )}

              {location.pathname !== '/app/inbox' &&
                location.pathname !== `/app/projects/${project?.$id}` && (
                  <div className='grid grid-cols-[minmax(0,180px)_max-content] items-center gap-1 text-xs text-muted-foreground ms-auto'>
                    <div className='truncate text-right'>
                      {task.project?.name || 'Inbox'}
                    </div>
                    {task.project ? (
                      <Hash size={14} color={task.project.color_hex}/>
                    ) : (
                      <Inbox
                        size={14}
                        className='text-muted-foreground'
                      />
                    )}
                  </div>
                )}
            </CardFooter>
          </Card>

          <div className='absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hst(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity focus-within:opacity-100 max-md:opacity-100'>
            {!task.completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-6 h-6 text-muted-foreground'
                    aria-label='Edit'
                    onClick={() => setTaskFormShow(true)}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='w-6 h-6 text-muted-foreground'
                      aria-label='Delete'
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete task</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this task?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The <strong>{trancateString(task.content)}</strong> task
                    will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      fetcher.submit(
                        JSON.stringify({
                          id: task.id,
                        }),
                        {
                          action: '/app',
                          method: 'DELETE',
                          encType: 'application/json',
                        },
                      )
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      {taskFormShow && (
        <TaskForm
          className='my-1'
          defaultFormData={{
            ...task,
            project,
          }}
          mode='edit'
          onCancel={() => setTaskFormShow(false)}
          onSubmit={formData => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'PUT',
              encType: 'application/json',
            })

            setTaskFormShow(false)
          }}
        />
      )}
    </>
  )
}
