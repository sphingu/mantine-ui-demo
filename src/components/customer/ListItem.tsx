import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
  MediaQuery,
  Anchor,
} from '@mantine/core'
import { IconClock, IconDeviceMobile, IconEdit, IconPhone } from '@tabler/icons'
import dayjs from 'dayjs'
import { ICustomer } from '../../types'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCustomerStore } from '../../stores'
dayjs.extend(relativeTime)

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
        ? theme.colors.dark[7]
        : theme.colors.gray[3],

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
  const { toggleOpenDrawer } = useCustomerStore()

  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={() => toggleOpenDrawer(customer.id)}
    >
      <Group>
        <Avatar color="blue" radius="xl">
          {customer.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <div style={{ flex: 1 }}>
          <Text weight={500}>{customer.name}</Text>

          {customer.mobile && (
            <Group
              style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
            >
              <IconDeviceMobile size={16} />
              <Anchor
                size="sm"
                href={`tel:${customer.mobile}`}
                target="_blank"
                style={{ lineHeight: 0 }}
              >
                {customer.mobile}
              </Anchor>
            </Group>
          )}
        </div>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group style={{ gap: '5px', alignItems: 'center' }}>
            <IconClock size={16} />
            <Text color="dimmed" size="xs" style={{ lineHeight: 0 }}>
              {dayjs(customer.createdAt).fromNow()}
            </Text>
          </Group>
        </MediaQuery>
      </Group>
    </UnstyledButton>
  )
}
