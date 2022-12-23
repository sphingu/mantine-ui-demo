import { showNotification } from '@mantine/notifications'

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
