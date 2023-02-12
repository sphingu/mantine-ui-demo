import { usePageTitle } from '../hooks'
import { useSessionStore } from '../stores'

import { createStyles, Avatar, Text, Group } from '@mantine/core'
import { IconAt } from '@tabler/icons'

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
      <h1>Profile Information</h1>
      {!userInfo ? (
        <p>No Profile Loaded</p>
      ) : (
        <Group noWrap>
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
