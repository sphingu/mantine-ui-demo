import { Button, Group } from '@mantine/core'
import { SpotlightProvider, openSpotlight } from '@mantine/spotlight'
import type { SpotlightAction } from '@mantine/spotlight'
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from '@tabler/icons'
import { useRouter } from '@tanstack/react-router'

export function RegisterSpotlight() {
  const { navigate } = useRouter()

  const actions: SpotlightAction[] = [
    {
      title: 'Home',
      onTrigger: () => navigate({ to: '/' }),
      icon: <IconHome size={18} />,
    },
    {
      title: 'About',
      onTrigger: () => navigate({ to: '/about' }),
      icon: <IconDashboard size={18} />,
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
