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
    disallowClose: true,
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

export const asynchronous =
  <T>(promise: () => Promise<T>) =>
  async (
    messages: {
      loading?: string
      success?: string
      error?: string
    } = {}
  ): Promise<T> => {
    const notificationId = loading(messages.loading || 'Fetching...')
    try {
      const data = await promise()
      updateForSuccess(
        notificationId,
        messages.success || 'Fetched information successfully'
      )
      return data
    } catch (error) {
      console.error(error)
      updateForError(
        notificationId,
        messages.error || 'Error occurred while fetching information'
      )
      throw error
    }
  }
