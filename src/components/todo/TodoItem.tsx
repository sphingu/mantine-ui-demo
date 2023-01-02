import { Group, Text, createStyles, ActionIcon } from '@mantine/core'
import { IconCircleCheck, IconCircleDotted, IconTrash } from '@tabler/icons'

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
  deleteIcon: {
    color: theme.colors.red[5],
  },
}))

interface Props {
  name: string
  isCompleted?: boolean
  onClick: () => void
  onDelete: () => void
}

export function TodoItem({ name, isCompleted, onClick, onDelete }: Props) {
  const { classes } = useStyles()
  return (
    <section className={classes.user}>
      <Group>
        <ActionIcon variant="transparent" onClick={onClick}>
          {isCompleted ? (
            <IconCircleCheck color="lime" size={24} />
          ) : (
            <IconCircleDotted color="gray" size={24} />
          )}
        </ActionIcon>
        <div style={{ flex: 1 }}>
          <Text td={isCompleted ? 'line-through' : ''}>{name}</Text>
        </div>
        <ActionIcon variant="transparent" onClick={onDelete}>
          <IconTrash size={24} className={classes.deleteIcon} />
        </ActionIcon>
      </Group>
    </section>
  )
}
