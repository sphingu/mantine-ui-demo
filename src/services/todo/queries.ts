import { useMutation, useQuery, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { useSessionStore } from '../../stores'
import { todoApi } from './apis'

const LIST_KEY = 'todos'
const ERRORS = {
  LIST: 'An error occurred while fetching todo list',
  CREATE: 'An error occurred while creating todo',
  DELETE: 'An error occurred while deleting todo',
  MARK_AS_COMPLETE: 'An error occurred while marking todo as complete',
}

export const useTodoListQuery = () => {
  return useQuery(LIST_KEY, todoApi.list, {
    onError: () => notifyHelper.error(ERRORS.LIST),
  })
}

export const useCreateTodoMutation = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  const { userInfo } = useSessionStore()
  return useMutation(
    async (task: string) =>
      todoApi.add({ task, userId: userInfo?.id as string }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(LIST_KEY)
        onSuccess()
      },
      onError: () => notifyHelper.error(ERRORS.CREATE),
    }
  )
}

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(todoApi.remove, {
    onSuccess: () => queryClient.invalidateQueries(LIST_KEY),
    onError: () => notifyHelper.error(ERRORS.DELETE),
  })
}

export const useMarkAsCompleteTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(todoApi.markAsComplete, {
    onSuccess: () => queryClient.invalidateQueries(LIST_KEY),
    onError: () => notifyHelper.error(ERRORS.MARK_AS_COMPLETE),
  })
}
