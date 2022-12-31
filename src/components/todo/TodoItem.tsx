import { UnstyledButton, Group, Text, createStyles } from '@mantine/core'
import { IconCircleCheck, IconCircleDotted } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    boxShadow: theme.shadows.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface Props {
  name: string
  isCompleted?: boolean
  onClick: () => void
}

export function TodoItem({ name, isCompleted, onClick }: Props) {
  const { classes } = useStyles()
  return (
    <UnstyledButton className={classes.user} onClick={onClick}>
      <Group>
        {isCompleted ? (
          <IconCircleCheck color="lime" size={24} />
        ) : (
          <IconCircleDotted color="gray" size={24} />
        )}
        <div style={{ flex: 1 }}>
          <Text td={isCompleted ? 'line-through' : ''}>{name}</Text>
        </div>
      </Group>
    </UnstyledButton>
  )
}
