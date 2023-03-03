import { showNotification, updateNotification } from '@mantine/notifications'
import { v4 as uuid } from 'uuid'

const baseUrl = import.meta.env.VITE_API_URL

interface MakeRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  body?: any
  msgs?: { loading: string; error: string; success: string }
  options?: RequestInit
}

const getHeaders = () => {
  const headers = new Headers()
  // TODO: implement logic to add headers here
  return headers
}

export async function makeRequest<T>({
  url,
  method = 'GET',
  options,
  body,
  msgs,
}: MakeRequestOptions): Promise<T> {
  const notificationId = uuid()
  showNotification({
    id: notificationId,
    loading: true,
    message: msgs?.loading || 'Requesting...',
    autoClose: false,
  })

  const requestUrl = url.includes('http') ? url : `${baseUrl}${url}`
  try {
    const response = await fetch(requestUrl, {
      ...options,
      method,
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch (error) {
      // console.log('failed to parse response', error)
    }

    // success case
    if (response.ok && !data?.error) {
      updateNotification({
        id: notificationId,
        color: 'teal',
        message: msgs?.success || 'Success',
        autoClose: 2000,
      })
      return data
    }

    // error case
    if (response.status === 401) {
      // SHOW LOGIN FORM
    } else if (data?.error === 'XYZ') {
      // ANY SPECIFIC ERROR
    } else {
      updateNotification({
        id: notificationId,
        color: 'red',
        message: `Error: ${response.status}\n${data?.error || text}`,
        autoClose: 2000,
      })
    }
  } catch (error) {
    updateNotification({
      id: notificationId,
      color: 'red',
      message: `An error occurred in fetching information`,
      autoClose: 2000,
    })
  }

  throw new Error('An error occurred in fetching information')
}
