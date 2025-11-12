// Node modules
import React from 'react'
import { Outlet } from 'react-router'

// Components
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const RootLayout = () => {
  return (
    <>
      <div className='min-h-dvh flex flex-col overflow-hidden'>
        <Header />
        <main className='grow grid grid-cols-1 pt-36 pb-16 items-center'>
          {/* дочерние компоненты родительского пути */}
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}
