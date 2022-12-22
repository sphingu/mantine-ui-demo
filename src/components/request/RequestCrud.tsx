import { useState } from 'react'
import { Button, Drawer } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import { RequestAddEditForm } from './RequestAddEditForm'
import { RequestList } from './RequestList'
import { useRequestStore } from '../../stores'
import { IRequest } from '../../types'

export const RequestCrud = () => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<IRequest | undefined>()
  const requestStore = useRequestStore()

  const openForm = (request?: IRequest) => {
    setSelectedRequest(request)
    setFormVisible(true)
  }
  const closeForm = () => {
    setFormVisible(false)
    setSelectedRequest(undefined)
  }

  const handleDeleteRequest = (requestId: string) => {
    // todo show confirm dialog and delete
    requestStore.delete(requestId)
    showNotification({
      message: 'Request deleted successfully',
      color: 'green',
    })
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
    closeForm()
  }
  const formTitle = (selectedRequest ? 'Update' : 'Add') + ' Request'
  return (
    <>
      <Button size="md" onClick={() => openForm()}>
        Add Request
      </Button>
      <RequestList
        requests={Object.values(requestStore.list)}
        onEdit={openForm}
        onDelete={handleDeleteRequest}
      />
      <Drawer
        opened={isFormVisible}
        onClose={() => closeForm()}
        title={<h1 style={{ margin: 0 }}>{formTitle}</h1>}
        padding="xl"
        size="xl"
      >
        <RequestAddEditForm
          initialValues={selectedRequest}
          onSubmit={handleSubmitRequest}
        />
      </Drawer>
    </>
  )
}
