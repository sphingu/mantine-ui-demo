import { Center, LoadingOverlay, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'

import { TodoInput, TodoList } from '../components'
import { usePageTitle } from '../hooks'
import { todoApi } from '../services'

import { useQuery } from 'react-query'
import { notifyHelper } from '../helpers'

export const TodoPage = () => {
  usePageTitle('Todo List')
  const { data, isLoading: isLoadingList } = useQuery('todos', todoApi.list, {
    onError: () =>
      notifyHelper.error('An error occurred while fetching todo list'),
  })

  return (
    <>
      <Center>
        <Text m="sm" size="xl" fw={700}>
          Todo List
        </Text>
      </Center>
      <TodoInput />
      <TodoList isLoading={isLoadingList} items={data || []} />
    </>
  )
}
