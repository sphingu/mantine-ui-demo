import { Button, Group, Text } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons'
import { useState } from 'react'
import { usePageTitle } from '../hooks'

interface Props {
  onLoginClick: () => Promise<void>
}

export const Login = ({ onLoginClick }: Props) => {
  usePageTitle('Login')
  const [loading, setLoading] = useState<boolean>(false)
  const handleSignIn = () => {
    setLoading(true)
    onLoginClick().finally(() => setLoading(false))
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        Welcome to <i>Mantine</i> !
      </h1>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Please sign in with bellow options
      </Text>

      <Group position="center" pt="xl">
        <Button
          color="dark"
          loaderPosition="center"
          size="lg"
          loading={loading}
          leftIcon={<IconBrandGithub size="20" />}
          onClick={handleSignIn}
        >
          Sign in with GitHub
        </Button>
      </Group>
    </>
  )
}
