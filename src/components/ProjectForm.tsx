// Node modules
import React, { useCallback, useEffect, useState, type FC } from 'react'

// Custom modules
import { cn } from '@/lib/utils'

// Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { ScrollArea } from './ui/scroll-area'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'

// Assets
import { Bot, Check, ChevronDown, Circle } from 'lucide-react'

// Constatns
import { PROJECT_COLORS } from '@/constants'

const DEFAULT_PROJECT_NAME = 'Untitled'
const DEFAULT_PROJECT_COLOR_NAME = 'Slate'
const DEFAULT_PROJECT_COLOR_HEX = '#64748b'

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
}
// Types
import type { Project, ProjectForm as ProjectFromType } from '@/types'

type ProjectFormProps = {
  defaultFormData?: Project
  mode: 'create' | 'edit'
  onCancel?: () => void
  onSubmit?: (formData: ProjectFromType) => void
}

export const ProjectForm: FC<ProjectFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [projectName, setProjectName] = useState<string>(defaultFormData.name)
  const [projectNameCharCount, setProjectNameCharCount] = useState<number>(
    defaultFormData.name.length,
  )

  const [colorName, setColorName] = useState<string>(defaultFormData.color_name)
  const [colorNameHex, setColorNameHex] = useState<string>(
    defaultFormData.color_hex,
  )
  const [colorOpen, setColorOpen] = useState<boolean>(false)
  const [aiTasGen, setAiTaskGet] = useState<boolean>(false)
  const [taskGenPrompt, setTaskGenPrompt] = useState<string>('')
  const [formData, setFormData] = useState<ProjectFromType>({
    ...defaultFormData,
    ai_task_gen: aiTasGen,
    task_gen_prompt: taskGenPrompt,
  })

  useEffect(() => {
    setFormData((prev: ProjectFromType) => ({
      ...prev,
      name: projectName,
      color_name: colorName,
      color_hex: colorNameHex,
      ai_task_gen: aiTasGen,
      task_gen_prompt: taskGenPrompt,
    }))
  }, [projectName, colorName, colorNameHex, aiTasGen, taskGenPrompt])

  const handleSubmit = useCallback(() => {
    if (onSubmit) onSubmit(formData)
  }, [onSubmit, formData])

  const handleKeySubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  return (
    <Card className='gap-1.5 py-1'>
      <CardHeader className='pt-4 ps-4'>
        <CardTitle>{mode === 'create' ? 'Add project' : 'Edit'}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className='p-4 grid grid-cols-1 gap-2'>
        <div>
          <Label htmlFor='project_name'>Name</Label>
          <Input
            type='text'
            id='project_name'
            className='mt-2 mb-1'
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProjectName(e.currentTarget.value)
              setProjectNameCharCount(e.currentTarget.value.length)
            }}
            value={projectName}
            maxLength={120}
            onKeyDown={handleKeySubmit}
          />
          <div
            className={cn(
              'text-xs text-muted-foreground max-w-max ms-auto',
              projectNameCharCount >= 110 && 'text-destructive',
            )}
          >
            {projectNameCharCount}/120
          </div>
        </div>

        <div>
          <Label htmlFor='color'>Color</Label>
          <Popover
            modal={true}
            open={colorOpen}
            onOpenChange={setColorOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-full mt-2'
                id='color'
              >
                <Circle fill={colorNameHex} />
                {colorName}
                <ChevronDown className='ms-auto' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='p-0 w-[458px] max-sm:w-[360px]'
            >
              <Command>
                <CommandInput placeholder='Search color ...' />
                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No color found.</CommandEmpty>
                    <CommandGroup>
                      {PROJECT_COLORS.map(({ name, hex }) => (
                        <CommandItem
                          key={name}
                          value={`${name}=${hex}`}
                          onSelect={(value: string) => {
                            const [name, hex] = value.split('=')
                            setColorName(name)
                            setColorNameHex(hex)
                            setColorOpen(false)
                          }}
                        >
                          <Circle fill={hex} />
                          {name}

                          {colorName === name && <Check className='ms-auto' />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {mode === 'create' && (
          <div className='border rounded-md mt-6'>
            <div className='flex items-center gap-3 py-2 px-3'>
              <Bot className='text-muted-foreground shrink-0' />

              <div className='space-y-0.5 me-auto'>
                <Label
                  htmlFor='ai_generator'
                  className='block text-sm'
                >
                  AI Task Generator
                </Label>
                <p className='text-xs text-muted-foreground'>
                  Automatically create tasks by providing a simple prompt.
                </p>
              </div>

              <Switch
                id='ai_generator'
                onCheckedChange={setAiTaskGet}
              />
            </div>

            {aiTasGen && (
              <Textarea
                autoFocus
                placeholder='Tell me about your project. What you want to accomplish'
                className='border-none'
                value={taskGenPrompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setTaskGenPrompt(e.currentTarget.value)
                }}
                onKeyDown={handleKeySubmit}
              />
            )}
          </div>
        )}
      </CardContent>

      <Separator />
      <CardFooter className='flex justify-end gap-3 py-2 px-4'>
        <Button
          variant='secondary'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!projectName || (aiTasGen && !taskGenPrompt)}
          onClick={handleSubmit}
        >
          {mode === 'create' ? 'Add' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  )
}
