import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { usePageTitle } from '../hooks'

export const About = () => {
  usePageTitle('About')
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
