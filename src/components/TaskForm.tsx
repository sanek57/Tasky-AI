// Node Modules
import { useCallback, useEffect, useState, type FC } from 'react'
import * as chrono from 'chrono-node'

// Custom modules
import { cn, formatCustomDate, getTaskDueDateColorClass } from '@/lib/utils'

// Components
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'

// Assets
import {
  CalendarDaysIcon,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from 'lucide-react'

// Types
import type { TaskForm as TaskFromType } from '@/types'
import type { ClassValue } from 'clsx'

type TaskFormProps = {
  defaultFormData?: TaskFromType
  className?: ClassValue
  mode: 'create' | 'edit'
  onCancel?: () => void
  onSubmit: (fromData: TaskFromType) => void
}

const proj: number[] = Array.from(Array(15).keys())

const DEFAULT_FROM_DATA: TaskFromType = {
  content: '',
  due_date: null,
  project: null,
}

export const TaskForm: FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FROM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [taskContent, setTaskContent] = useState<string>(
    defaultFormData.content,
  )
  const [dueDate, setDueDate] = useState<Date | null>(defaultFormData.due_date)
  const [projectId, setProjectId] = useState<string | null>(
    defaultFormData.project,
  )
  const [projectName, setProjectName] = useState<string>('')
  const [projectColorHex, setProjectColorHex] = useState<string>('')

  const [dueDateOpen, setDueDateOpen] = useState<boolean>(false)
  const [projectOpen, setProjectOpen] = useState<boolean>(false)

  const [formData, setFormData] = useState<TaskFromType>(defaultFormData)

  useEffect(() => {
    setFormData((prev: TaskFromType) => ({
      ...prev,
      content: taskContent,
      due_date: dueDate,
      projectId: projectId,
    }))
  }, [taskContent, dueDate, projectId])

  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent)

    if(chronoParsed.length) {
      const lastDate = chronoParsed[chronoParsed.length - 1]

      setDueDate(lastDate.date())
    }
  }, [taskContent])

  const handleSubmit = useCallback(() => {
    if (!taskContent) return


    if (onSubmit) onSubmit(formData)

    setTaskContent('')
  }, [taskContent, formData, onSubmit])

  return (
    <Card className='focus-within:border-foreground/30 p-1! gap-0'>
      <CardContent className='p-2'>
        <Textarea
          className='border-0! ring-0! mb-2! p-1!'
          placeholder='After finishing the project, Take a tour'
          autoFocus
          value={taskContent}
          onInput={e => {
            setTaskContent(e.currentTarget.value)
          }}
        />

        <div className='ring-1 ring-border rounded-md max-w-max'>
          <Popover
            open={dueDateOpen}
            onOpenChange={setDueDateOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarDaysIcon />
                {dueDate ? formatCustomDate(dueDate) : 'Due date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto! p-0!'>
              <Calendar
                mode='single'
                disabled={{ before: new Date() }}
                autoFocus
                onSelect={selected => {
                  setDueDate(selected || null)
                  setDueDateOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='px-2! -ms-2!'
                  aria-label='Remove due date'
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>

              <TooltipContent className='bg-primary! text-foreground!'>
                Remove due date
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className='grid grid-cols-[minmax(0,1fr)_max-content] gap-2 p-2'>
        <Popover
          open={projectOpen}
          onOpenChange={setProjectOpen}
          modal
        >
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              role='combobox'
              aria-expanded={projectOpen}
              className='max-w-max'
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-60 p-0'
            align='start'
          >
            <Command>
              <CommandInput placeholder='Search project ...' />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No projects found</CommandEmpty>
                  <CommandGroup>
                    {proj.map(i => (
                      <CommandItem key={i}>
                        <Hash /> Project {i}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <Button
            variant='secondary'
            onClick={onCancel}
          >
            <span className='max-md:hidden'>Cancel</span>
            <X />
          </Button>
          <Button
            disabled={!taskContent}
            onClick={handleSubmit}
          >
            <span className='max-md:hidden'>
              {mode === 'create' ? 'Add task' : 'Save'}
            </span>
            <SendHorizonal className='md:hidden' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
