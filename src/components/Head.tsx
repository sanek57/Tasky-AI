// Node modules
import { type FC } from 'react'
import { Helmet } from 'react-helmet'

// Types
type HeadProps = {
  title: string
}

export const Head: FC<HeadProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
