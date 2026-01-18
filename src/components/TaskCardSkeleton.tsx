import React from 'react'

// Components
import { Skeleton } from './ui/skeleton'

export const TaskCardSkeleton = () => {
  return (
    <div className='grid grid-cols-[max-content_1fr] gap-3 items-center border-b pt-2 pb-3.5'>
      <Skeleton className='h-5 w-5 rounded-full' />
      <Skeleton className='h-3 me-10' />
    </div>
  )
}
