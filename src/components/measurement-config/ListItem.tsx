import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  MediaQuery,
} from '@mantine/core'
import { IconClock } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { IMeasurementConfig } from '../../types'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMeasurementConfigStore } from '../../stores'
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
  data: IMeasurementConfig
}

export function ListItem({ data, ...others }: UserButtonProps) {
  const { classes } = useStyles()
  const { toggleOpenDrawer } = useMeasurementConfigStore()

  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={() => toggleOpenDrawer(data.id)}
    >
      <Group>
        <Avatar color="blue" radius="xl">
          {data.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <div style={{ flex: 1 }}>
          <Text weight={500}>{data.name}</Text>
          <Text weight={500}>{data.fields}</Text>
        </div>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group style={{ gap: '5px', alignItems: 'center' }}>
            <IconClock size={16} />
            <Text color="dimmed" size="xs" style={{ lineHeight: 0 }}>
              {dayjs(data.createdAt).fromNow()}
            </Text>
          </Group>
        </MediaQuery>
      </Group>
    </UnstyledButton>
  )
}
