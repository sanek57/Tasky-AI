// Node modules

// Components
import { Head } from '@/components/Head'
import { SignUp } from '@clerk/clerk-react'

export const RegisterPage = () => {
  return (
    <>
      <Head title='Create an Account - Tasky AI To-Do List & Project Managment App' />

      <section>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  )
}
