import { usePageTitle } from '../hooks'
import { useSessionStore } from '../stores'

import { createStyles, Avatar, Text, Group, Title } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
  avatar: {
    boxShadow: theme.shadows.sm,
  },
}))

export const ProfilePage = () => {
  usePageTitle('Profile')
  const { classes } = useStyles()
  const { userInfo } = useSessionStore()
  return (
    <>
      <Title p="sm">Profile information</Title>
      {!userInfo ? (
        <Text p="sm">No Profile Loaded</Text>
      ) : (
        <Group p="sm" noWrap>
          <Avatar
            src={userInfo.profileImage}
            size={94}
            radius="xs"
            className={classes.avatar}
          />
          <div>
            <Text
              size="xs"
              sx={{ textTransform: 'uppercase' }}
              weight={700}
              color="dimmed"
            >
              {userInfo.userName}
            </Text>
            <Text size="lg" weight={500}>
              {userInfo.fullName}
            </Text>
            <Group noWrap spacing={2} mt={3}>
              <IconAt stroke={1.5} size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {userInfo.email}
              </Text>
            </Group>
          </div>
        </Group>
      )}
    </>
  )
}
