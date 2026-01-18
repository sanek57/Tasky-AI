// Node Modules
import React, { type FC } from 'react'

// Types
type KbdProps = {
  kbdList: string[]
}

export const Kbd: FC<KbdProps> = ({ kbdList }) => {
  return (
    <div className='space-x-1'>
      <span className='sr-only'>Keyboard shortcut is, </span>
      {kbdList.map((item, index) => (
        <kbd
          key={index}
          className='inline-block px-1 py-0.5 bg-background/10 rounded-full'
        >
          {item}
        </kbd>
      ))}
    </div>
  )
}
