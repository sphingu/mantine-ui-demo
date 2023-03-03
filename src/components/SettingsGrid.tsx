import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from '@mantine/core'
import { IconReport, IconCoin, IconRuler } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'

enum SettingsEnum {
  Measurement = 'Measurement',
  Reports = 'Reports',
  Payments = 'Payments',
}

const actions = [
  { title: SettingsEnum.Measurement, icon: IconRuler, color: 'violet' },
  { title: SettingsEnum.Reports, icon: IconReport, color: 'pink' },
  { title: SettingsEnum.Payments, icon: IconCoin, color: 'red' },
]

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 100,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    boxShadow: theme.shadows.sm,
    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}))

export function SettingsGrid() {
  const { classes, theme } = useStyles()
  const navigate = useNavigate()

  const handleButtonClick = (action: SettingsEnum) => {
    switch (action) {
      case SettingsEnum.Measurement:
        navigate({ to: '/settings-measurements' })
        break

      default:
        break
    }
  }

  const actionButtons = actions.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => handleButtonClick(item.title)}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ))

  return (
    <SimpleGrid
      cols={3}
      m="lg"
      breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'lg' },
        { maxWidth: 'sm', cols: 2, spacing: 'lg' },
        { maxWidth: 'xs', cols: 1, spacing: 'lg' },
      ]}
    >
      {actionButtons}
    </SimpleGrid>
  )
}
