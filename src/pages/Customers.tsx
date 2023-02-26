import { Title } from '@mantine/core'
import { RequestCrud } from '../components'
import { usePageTitle } from '../hooks'

export const CustomersPage = () => {
  usePageTitle('Customers')
  return (
    <>
      <Title>Customers</Title>
      Customer List component goes here
    </>
  )
}
