// Node modules
import React, { useEffect, useState, type FC } from 'react'

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { SidebarTrigger } from './ui/sidebar'
import { Kbd } from './Kbd'
import { cn } from '@/lib/utils'

// Types
type TopAppBarProps = {
  title: string
  taskCount?: number
}

export const TopAppBar: FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState<boolean>(false)

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70)

    listener()
    window.addEventListener('scroll', listener)

    return () => window.removeEventListener('scroll', listener)
  }, [])

  return (
    <div
      className={cn(
        'sticky z-40 bg-background top-0 h-14 grid grid-cols-[40px_minmax(0,1fr)_40px] items-center px-4',
        showTitle && 'border-b',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent className='flex items-center'>
          <p>Toogle sidebar</p>
          {/* this is default key on win/lin/mac */}
          <Kbd kbdList={['Ctrl', 'B']} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'max-w-[480px] mx-auto text-center transition-[transform,opacity]',
          showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        <h1 className='font-semibold truncate'>{title}</h1>
        {Boolean(taskCount) && (
          <div className='text-xs text-muted-foreground'>{taskCount} task</div>
        )}
      </div>
    </div>
  )
}
