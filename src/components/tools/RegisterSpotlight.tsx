import { SpotlightProvider } from '@mantine/spotlight'
import type { SpotlightAction } from '@mantine/spotlight'
import {
  IconHome,
  IconDashboard,
  IconSearch,
  IconUser,
  IconUsers,
  IconRuler,
  IconSettings,
} from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'

export function RegisterSpotlight() {
  const navigate = useNavigate()

  const actions: SpotlightAction[] = [
    {
      title: 'Home Page',
      onTrigger: () => navigate({ to: '/' }),
      icon: <IconHome size={18} />,
    },
    {
      title: 'Todo Page',
      onTrigger: () => navigate({ to: '/todo' }),
      icon: <IconDashboard size={18} />,
    },
    {
      title: 'Profile Page',
      onTrigger: () => navigate({ to: '/profile' }),
      icon: <IconUser size={18} />,
    },
    {
      title: 'Customers Page',
      onTrigger: () => navigate({ to: '/customers' }),
      icon: <IconUsers size={18} />,
    },
    {
      title: 'Settings',
      onTrigger: () => navigate({ to: '/settings' }),
      icon: <IconSettings size={18} />,
    },
    {
      title: 'Measurement Settings',
      onTrigger: () => navigate({ to: '/settings-measurements' }),
      icon: <IconRuler size={18} />,
    },
  ]
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut="mod + K"
      nothingFoundMessage="Nothing found..."
    />
  )
}
