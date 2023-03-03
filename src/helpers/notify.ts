import { showNotification, updateNotification } from '@mantine/notifications'
import { v4 as uuid } from 'uuid'

export const success = (message: string) =>
  showNotification({
    message,
    color: 'green',
  })

export const error = (message: string) =>
  showNotification({
    message,
    color: 'red',
  })

export const info = (message: string) =>
  showNotification({
    message,
    color: 'blue',
  })

export const warning = (message: string) =>
  showNotification({
    message,
    color: 'yellow',
  })

const loading = (message: string): string => {
  const id = uuid()
  showNotification({
    id: id,
    loading: true,
    message: message,
    autoClose: false,
  })
  return id
}
const updateForSuccess = (id: string, message: string) => {
  updateNotification({
    id: id,
    color: 'teal',
    message: message,
    autoClose: 2000,
  })
}

const updateForError = (id: string, message: string) => {
  updateNotification({
    id: id,
    color: 'red',
    message: message,
    autoClose: 2000,
  })
}

type IMessages = {
  loading?: string
  success?: string
  error?: string
}

export const wrapAsync =
  <TParams extends Array<any>, TResult>(
    fn: (...args: TParams) => Promise<TResult>,
    messages?: IMessages
  ) =>
  async (...args: TParams): Promise<TResult> => {
    const notificationId = loading(messages?.loading || 'Fetching...')
    try {
      const data = await fn(...args)
      updateForSuccess(
        notificationId,
        messages?.success || 'Fetched information successfully'
      )
      return data
    } catch (error) {
      console.error(error)
      updateForError(
        notificationId,
        messages?.error || 'Error occurred while fetching information'
      )
      throw error
    }
  }
