import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
} from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import { IconChartRadar } from '@tabler/icons'
import { useRouter } from '@tanstack/react-router'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    marginBottom: '0 !important',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

interface HeaderResponsiveProps {
  links: { link: string; label: string }[]
}

export function AppHeader({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false)
  const ref = useClickOutside(
    () => setTimeout(close, 300),
    ['mouseup', 'touchend']
  )
  const { classes } = useStyles()
  const { navigate } = useRouter()

  const navLinks = links.map((link) => (
    <a
      key={link.link}
      href="#"
      className={classes.link}
      onClick={(e) => {
        e.preventDefault()
        navigate({ to: link.link as any })
        close()
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <Header
      height={HEADER_HEIGHT}
      mb={120}
      className={`${classes.root} box-style`}
    >
      <Container className={classes.header}>
        <Group>
          <IconChartRadar size="34" color="#228be6" stroke={1.5} />
          <h1>Mantine</h1>
        </Group>
        <Group spacing={5} className={classes.links}>
          {navLinks}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              ref={ref}
              className={classes.dropdown}
              withBorder
              style={styles}
            >
              {navLinks}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
