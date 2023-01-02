import { RequestCrud } from '../components'
import { usePageTitle } from '../hooks'

export const HomePage = () => {
  usePageTitle('Home')
  return (
    <>
      <h1>Home Page</h1>
      <RequestCrud />
    </>
  )
}
