import { useHotkeys } from '@mantine/hooks'
import { useNavigate } from '@tanstack/react-router'
import { useSessionStore } from '../../stores'

export const RegisterHotKeys = () => {
  const navigate = useNavigate()
  const { setMock } = useSessionStore()
  useHotkeys([
    ['H', () => navigate({ to: '/' })],
    ['T', () => navigate({ to: '/todo' })],
    ['P', () => navigate({ to: '/profile' })],
    ['C', () => navigate({ to: '/customers' })],
    ['R', () => navigate({ to: '/settings-measurements' })],
    ['S', () => navigate({ to: '/settings' })],
    ['M', () => setMock(true)],
  ])

  return null
}
