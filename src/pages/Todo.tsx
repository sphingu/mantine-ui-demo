import { Center, LoadingOverlay, Text } from '@mantine/core'
import { useInputState } from '@mantine/hooks'

import { TodoInput, TodoList } from '../components'
import { usePageTitle } from '../hooks'
import { todoApi } from '../services'
import { useSessionStore } from '../stores'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { notifyHelper } from '../helpers'
import { ITodo } from '../types'

export const TodoPage = () => {
  usePageTitle('Todo List')
  const queryClient = useQueryClient()
  const { userInfo } = useSessionStore()
  const [value, onChange] = useInputState('')
  const { data, isLoading: isLoadingList } = useQuery('todos', todoApi.list, {
    onError: () =>
      notifyHelper.error('An error occurred while fetching todo list'),
  })
  const { mutate: addTodo, isLoading: isAdding } = useMutation(
    async () => todoApi.add(value, userInfo?.id as string),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
        onChange('')
      },
      onError: () => notifyHelper.error('An error occurred while adding todo'),
    }
  )
  const { mutate: deleteTodo, isLoading: isDeleting } = useMutation(
    async (id: number) => todoApi.remove(id),
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
      onError: () =>
        notifyHelper.error('An error occurred while deleting todo'),
    }
  )
  const { mutate: markAsCompleted, isLoading: isMarking } = useMutation(
    async (todo: ITodo) => todoApi.markAsComplete(todo.id, !todo.completed),
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
      onError: () =>
        notifyHelper.error('An error occurred while marking todo as complete'),
    }
  )

  return (
    <>
      <Center>
        <Text m="sm" size="xl" fw={700}>
          Todo List
        </Text>
      </Center>
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isAdding} />
        <TodoInput value={value} onChange={onChange} onSubmit={addTodo} />
      </div>
      <TodoList
        isLoading={isLoadingList || isDeleting || isMarking}
        items={data || []}
        onItemClick={markAsCompleted}
        onItemDelete={deleteTodo}
      />
    </>
  )
}
