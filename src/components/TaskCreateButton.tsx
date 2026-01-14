// Node modules
import React, { type FC } from 'react'
import { Button } from './ui/button'
import { CirclePlus } from 'lucide-react'

// Components

// Assets

// Types
// remove field className from object
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>

export const TaskCreateButton: FC<TaskCreateButtonProps> = props => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  )
}
