import { useState } from 'react'
import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import { RequestAddEditForm } from './RequestAddEditForm'
import { RequestList } from './RequestList'
import { useRequestStore } from '../../stores'
import { IRequest } from '../../types'

export const RequestCrud = () => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<IRequest | undefined>()
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
