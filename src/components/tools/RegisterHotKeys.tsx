import { useHotkeys } from '@mantine/hooks'
import { useRouter } from '@tanstack/react-router'
import { useSessionStore } from '../../stores'

export const RegisterHotKeys = () => {
  const { navigate } = useRouter()
  const { setMock } = useSessionStore()
  useHotkeys([
    ['H', () => navigate({ to: '/' })],
    ['T', () => navigate({ to: '/todo' })],
    ['P', () => navigate({ to: '/profile' })],
    ['C', () => navigate({ to: '/customers' })],
    ['M', () => setMock(true)],
  ])

  return null
}
