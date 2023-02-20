import { useMutation, useQuery, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { customerAPI } from './apis'

const LIST_KEY = 'customers'
const ERRORS = {
  LIST: 'An error occurred while fetching customers',
  CREATE: 'An error occurred while creating customer',
  UPDATE: 'An error occurred while updating customer',
  DELETE: 'An error occurred while deleting customer',
}

export const useCustomerListQuery = () =>
  useQuery(LIST_KEY, customerAPI.list, {
    onError: () => notifyHelper.error(ERRORS.LIST),
  })

export const useCreateCustomerMutation = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  return useMutation(customerAPI.add, {
    onSuccess: () => {
      queryClient.invalidateQueries(LIST_KEY)
      onSuccess()
    },
    onError: () => notifyHelper.error(ERRORS.CREATE),
  })
}

export const useUpdateCustomerMutation = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  return useMutation(customerAPI.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(LIST_KEY)
      onSuccess()
    },
    onError: () => notifyHelper.error(ERRORS.UPDATE),
  })
}

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(customerAPI.remove, {
    onSuccess: () => queryClient.invalidateQueries(LIST_KEY),
    onError: () => notifyHelper.error(ERRORS.DELETE),
  })
}
