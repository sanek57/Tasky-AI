import React, { type FC, type PropsWithChildren } from 'react'

// Types

const Page: FC<PropsWithChildren> = ({ children }) => {
  return <div className='container md:max-w-3xl'>{children}</div>
}

const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className='pt-2 pb-3 space-y-2 md:px-4 lg:px-10'>{children}</div>
}

const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className='text-2xl font-semibold'>{children}</h1>
}

const PageList: FC<PropsWithChildren> = ({ children }) => {
  return <div className='pt-2 pb-20 md:px-4 lg:px-10'>{children}</div>
}

export { Page, PageHeader, PageTitle, PageList }
