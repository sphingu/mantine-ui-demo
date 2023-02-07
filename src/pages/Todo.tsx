import { Center, Text } from '@mantine/core'

import { TodoInput, TodoList } from '../components'
import { usePageTitle } from '../hooks'

export const TodoPage = () => {
  usePageTitle('Todo List')

  return (
    <>
      <Center>
        <Text m="sm" size="xl" fw={700}>
          Todo List
        </Text>
      </Center>
      <TodoInput />
      <TodoList />
    </>
  )
}
