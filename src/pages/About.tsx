import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { CreateRequestForm } from '../components'
import { usePageTitle } from '../hooks'
import { v4 as uuid } from 'uuid'

export const About = () => {
  usePageTitle('About')
  return (
    <>
      <h1>About page</h1>
      <CreateRequestForm
        initialValues={{
          id: uuid(),
          method: 'POST',
          name: 'My namem',
          url: 'http://google.com/one',
          body: '{\n  "one": "Two"\n}',
        }}
        onSubmit={(va) =>
          showNotification({
            message: <pre>{JSON.stringify(va, undefined, 2)}</pre>,
          })
        }
      />
      <Button
        variant="outline"
        onClick={() =>
          showNotification({
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
          })
        }
      >
        Show notification
      </Button>
    </>
  )
}
