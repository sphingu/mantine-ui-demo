import { Center, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'

import { TodoInput, TodoList } from '../components'
import { usePageTitle } from '../hooks'
import { todoApi } from '../services'
import { useSessionStore } from '../stores'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { notifyHelper } from '../helpers'

export const About = () => {
  usePageTitle('About')
  const queryClient = useQueryClient()
  const { userInfo } = useSessionStore()
  const [value, onChange] = useInputState('')
  const { data, isLoading } = useQuery('todos', todoApi.list, {
    onError: () =>
      notifyHelper.error('An error occurred while fetching todo list'),
  })
  const { mutate: addTodo } = useMutation(
    async () => {
      return todoApi.add(value, userInfo?.id as string)
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
        onChange('')
      },
    }
  )

  return (
    <>
      <Center>
        <Text m="sm" size="xl" fw={700}>
          Todo List
        </Text>
      </Center>
      <TodoInput value={value} onChange={onChange} onSubmit={addTodo} />
      <TodoList
        isLoading={isLoading}
        items={data || []}
        onItemClick={() => console.log('edit')}
      />
    </>
  )
}
