import { useMutation, useQuery, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { customerAPI } from './apis'

const LIST_KEY = 'customers'
const SINGLE_KEY = 'customer'
const ERRORS = {
  LIST: 'An error occurred while fetching customers',
  SINGLE: 'An error occurred while fetching customer information',
  CREATE: 'An error occurred while creating customer',
  UPDATE: 'An error occurred while updating customer',
  DELETE: 'An error occurred while deleting customer',
}
const SUCCESS_MSG = {
  CREATE: 'Customer has been created successfully',
  UPDATE: 'Customer has been updated successfully',
}

export const useCustomerListQuery = () =>
  useQuery(LIST_KEY, customerAPI.list, {
    onError: () => notifyHelper.error(ERRORS.LIST),
  })
export const useCustomerQuery = (id?: number) =>
  useQuery([SINGLE_KEY, id], () => customerAPI.single(id), {
    onError: () => notifyHelper.error(ERRORS.SINGLE),
    enabled: !!id,
  })

export const useCustomerMutate = ({
  isCreate,
  onSuccess,
}: {
  isCreate: boolean
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  return useMutation(customerAPI.createOrUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(LIST_KEY)
      notifyHelper.success(isCreate ? SUCCESS_MSG.CREATE : SUCCESS_MSG.UPDATE)
      onSuccess()
    },
    onError: () => notifyHelper.error(isCreate ? ERRORS.CREATE : ERRORS.UPDATE),
  })
}

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(customerAPI.remove, {
    onSuccess: () => queryClient.invalidateQueries(LIST_KEY),
    onError: () => notifyHelper.error(ERRORS.DELETE),
  })
}
