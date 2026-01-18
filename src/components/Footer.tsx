// Node modules

import { Separator } from '@/components/ui/separator'
import { SOCIAL_LINKS } from '@/constants'

export const Footer = () => {
  return (
    <footer className='p-4 pb-0'>
      <div className='container min-h-16 py-4 bg-background border border-b-0 rounded-t-xl flex flex-col gap-3 items-center lg:flex-row lg:justify-between'>
        <p className=''>&copy; 2025 sanekofblack</p>
        <ul className='flex flex-wrap'>
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li
              key={index}
              className='flex items-center'
            >
              <a
                href={href}
                className='text-sm text-muted-foreground hover:text-foreground'
                target='_blank'
              >
                {label}
              </a>

              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator
                  orientation='vertical'
                  className='h-3 mx-3'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
