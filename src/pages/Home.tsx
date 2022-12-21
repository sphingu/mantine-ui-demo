import { Button, Input } from '@mantine/core'
import { usePageTitle } from '../hooks'
import { useRequestStore } from '../stores'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import { RequestAddEditForm, RequestList } from '../components'
import { IRequest } from '../types'
import { showNotification } from '@mantine/notifications'

export const Home = () => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<IRequest | undefined>()
  usePageTitle('Home')
  const requestStore = useRequestStore()

  const handleEditRequest = (request: IRequest) => {
    setSelectedRequest(request)
    setFormVisible(true)
  }
  const handleDeleteRequest = (requestId: string) => {
    // todo show confirm dialog and delete
    requestStore.delete(requestId)
    showNotification({
      message: 'Request deleted successfully',
      color: 'green',
    })
  }
  const handleAddRequest = () => {
    setSelectedRequest(undefined)
    setFormVisible(true)
  }
  const handleSubmitRequest = (request: IRequest) => {
    if (selectedRequest) {
      requestStore.update(request)
      showNotification({
        message: 'Request updated successfully',
        color: 'green',
      })
    } else {
      requestStore.create(request)
      showNotification({
        message: 'Request create successfully',
        color: 'green',
      })
    }
    setFormVisible(false)
    setSelectedRequest(undefined)
  }
  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={handleAddRequest}>Add Request</Button>
      <RequestList
        requests={Object.values(requestStore.list)}
        onEdit={handleEditRequest}
        onDelete={handleDeleteRequest}
      />
      {isFormVisible && (
        <RequestAddEditForm
          initialValues={selectedRequest}
          onSubmit={handleSubmitRequest}
        />
      )}
    </>
  )
}
