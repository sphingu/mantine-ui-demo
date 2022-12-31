import { TodoList } from '../components'
import { usePageTitle } from '../hooks'

export const About = () => {
  usePageTitle('About')
  return (
    <>
      <h1>About</h1>
      <TodoList
        items={[]}
        onEdit={() => console.log('edit')}
        onDelete={() => console.log('del')}
      />
    </>
  )
}
