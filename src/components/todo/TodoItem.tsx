import { Group, Text, createStyles, ActionIcon, Loader } from '@mantine/core'
import { IconCircleCheck, IconCircleDotted, IconTrash } from '@tabler/icons'

import {
  useDeleteTodoMutation,
  useMarkAsCompleteTodoMutation,
} from '../../services'

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
  id: number
  name: string
  isCompleted?: boolean
}

export function TodoItem({ id, name, isCompleted }: Props) {
  const { classes } = useStyles()

  const { mutate: deleteTodo, isLoading: isDeleting } = useDeleteTodoMutation()
  const { mutate: markAsCompleted, isLoading: isMarking } =
    useMarkAsCompleteTodoMutation()
  return (
    <section className={classes.user}>
      <Group>
        <ActionIcon
          variant="transparent"
          onClick={() => markAsCompleted({ id, isCompleted: !isCompleted })}
          disabled={isMarking}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isMarking ? (
            <Loader size="sm" />
          ) : isCompleted ? (
            <IconCircleCheck color="lime" size={24} />
          ) : (
            <IconCircleDotted color="gray" size={24} />
          )}
        </ActionIcon>
        <div style={{ flex: 1 }}>
          <Text td={isCompleted ? 'line-through' : ''}>{name}</Text>
        </div>
        <ActionIcon
          variant="transparent"
          onClick={() => deleteTodo(id)}
          disabled={isDeleting}
          aria-label="Delete"
        >
          {isDeleting ? (
            <Loader size="sm" />
          ) : (
            <IconTrash size={24} className={classes.deleteIcon} />
          )}
        </ActionIcon>
      </Group>
    </section>
  )
}
