// Node Modules
import { SignIn } from '@clerk/clerk-react'

// Components
import { Head } from '@/components/Head'

export const LoginPage = () => {
  return (
    <>
      <Head title='Login In to Tasky AI To-Do List & Projects' />

      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  )
}
