import { makeRequest } from './http'

export const list = async () => {
  return makeRequest({ url: '/requests' })
}
