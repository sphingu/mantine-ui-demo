import { RequestCrud } from '../components'
import { usePageTitle } from '../hooks'

export const Home = () => {
  usePageTitle('Home')
  return (
    <>
      <h1>Home Page</h1>
      <RequestCrud />
    </>
  )
}
