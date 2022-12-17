import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

export const About = () => {
  return (
    <>
      <h1>About page</h1>
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
