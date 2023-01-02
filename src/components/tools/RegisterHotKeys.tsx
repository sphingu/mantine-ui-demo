import { useHotkeys } from '@mantine/hooks'
import { useRoute, useRouter } from '@tanstack/react-router'

export const RegisterHotKeys = () => {
  const { navigate } = useRouter()
  useHotkeys([
    ['H', () => navigate({ to: '/' })],
    ['T', () => navigate({ to: '/todo' })],
    ['P', () => navigate({ to: '/profile' })],
  ])

  return null
}
