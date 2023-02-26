import { useMutation, useQuery, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { measurementAPI } from './apis'

const LIST_KEY = 'measurementConfigs'
const SINGLE_KEY = 'measurementConfig'
const ERRORS = {
  LIST: 'An error occurred while fetching measurement Configs',
  SINGLE: 'An error occurred while fetching measurement Config information',
  CREATE: 'An error occurred while creating measurement Config',
  UPDATE: 'An error occurred while updating measurement Config',
  DELETE: 'An error occurred while deleting measurement Config',
}
const SUCCESS_MSG = {
  CREATE: 'Measurement Config has been created successfully',
  UPDATE: 'Measurement Config has been updated successfully',
}

export const useMeasurementConfigListQuery = () =>
  useQuery(LIST_KEY, measurementAPI.list, {
    onError: () => notifyHelper.error(ERRORS.LIST),
  })
export const useMeasurementConfigQuery = (id?: number) =>
  useQuery([SINGLE_KEY, id], () => measurementAPI.single(id), {
    onError: () => notifyHelper.error(ERRORS.SINGLE),
    enabled: !!id,
  })

export const useMeasurementConfigMutate = ({
  isCreate,
  onSuccess,
}: {
  isCreate: boolean
  onSuccess: () => void
}) => {
  const queryClient = useQueryClient()
  return useMutation(measurementAPI.createOrUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(LIST_KEY)
      notifyHelper.success(isCreate ? SUCCESS_MSG.CREATE : SUCCESS_MSG.UPDATE)
      onSuccess()
    },
    onError: () => notifyHelper.error(isCreate ? ERRORS.CREATE : ERRORS.UPDATE),
  })
}

export const useDeleteMeasurementConfigMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(measurementAPI.remove, {
    onSuccess: () => queryClient.invalidateQueries(LIST_KEY),
    onError: () => notifyHelper.error(ERRORS.DELETE),
  })
}
