import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
} from '@mantine/core'
import { IconEdit } from '@tabler/icons'
import { ICustomer } from '../../types'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[5],

    '&:last-of-type': {
      borderWidth: 0,
    },

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  customer: ICustomer
}

export function ListItem({ customer, ...others }: UserButtonProps) {
  const { classes } = useStyles()

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar radius="xl">{customer.name.slice(0, 2).toUpperCase()}</Avatar>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {customer.name}
          </Text>

          <Text color="dimmed" size="xs">
            {customer.createdAt}
          </Text>
        </div>

        <ActionIcon
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <IconEdit />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  )
}
