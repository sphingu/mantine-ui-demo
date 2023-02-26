import { Title } from '@mantine/core'
import { RequestCrud } from '../components'
import { usePageTitle } from '../hooks'

export const HomePage = () => {
  usePageTitle('Home')
  return (
    <>
      <Title>Home Page</Title>
      <RequestCrud />
    </>
  )
}
