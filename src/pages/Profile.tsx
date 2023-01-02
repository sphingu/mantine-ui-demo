import { useSessionStorage } from '@mantine/hooks'
import { RequestCrud } from '../components'
import { usePageTitle } from '../hooks'
import { useSessionStore } from '../stores'

import { createStyles, Avatar, Text, Group, Center } from '@mantine/core'
import { IconPhoneCall, IconAt } from '@tabler/icons'

export const ProfilePage = () => {
  usePageTitle('Profile')
  const { userInfo } = useSessionStore()
  return (
    <>
      <h1>Profile Information</h1>
      <UserInfoIcons
        avatar={userInfo?.user_metadata.avatar_url as string}
        email={userInfo?.email as string}
        name={userInfo?.user_metadata.full_name as string}
        username={userInfo?.user_metadata.user_name as string}
      />
    </>
  )
}

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

interface UserInfoIconsProps {
  avatar: string
  name: string
  email: string
  username: string
}

function UserInfoIcons({ avatar, name, username, email }: UserInfoIconsProps) {
  const { classes } = useStyles()
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="xs" className={classes.avatar} />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: 'uppercase' }}
            weight={700}
            color="dimmed"
          >
            {username}
          </Text>

          <Text size="lg" weight={500}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  )
}
