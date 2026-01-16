// Node modules
import { Loader2, Search } from 'lucide-react'
import React, { type FC } from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

// Components

// Assets

// Types
export type SearchingState = 'idle' | 'searching' | 'loading'
type ProjectSearchFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  searchingState: SearchingState
}

export const ProjectSearchField: FC<ProjectSearchFieldProps> = ({
  handleChange,
  searchingState,
}) => {
  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none'
      />
      <Input
        type='text'
        name='q'
        placeholder='Search project'
        className='px-8'
        onChange={handleChange}
      />
      <Loader2
        size={18}
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground pointer-events-none hidden',
          searchingState !== 'idle' && 'block animate-spin'
        )}
      />
    </div>
  )
}
