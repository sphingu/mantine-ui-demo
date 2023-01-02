import { Group, Text, createStyles, ActionIcon } from '@mantine/core'
import { IconCircleCheck, IconCircleDotted, IconTrash } from '@tabler/icons'
import { useMutation, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { todoApi } from '../../services'
import { ITodo } from '../../types'

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
  const queryClient = useQueryClient()

  const { mutate: deleteTodo, isLoading: isDeleting } = useMutation(
    async () => todoApi.remove(id),
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
      onError: () =>
        notifyHelper.error('An error occurred while deleting todo'),
    }
  )
  const { mutate: markAsCompleted, isLoading: isMarking } = useMutation(
    async () => todoApi.markAsComplete(id, !isCompleted),
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
      onError: () =>
        notifyHelper.error('An error occurred while marking todo as complete'),
    }
  )
  return (
    <section className={classes.user}>
      <Group>
        <ActionIcon
          variant="transparent"
          onClick={() => markAsCompleted()}
          disabled={isMarking}
        >
          {isCompleted ? (
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
          onClick={() => deleteTodo()}
          disabled={isDeleting}
        >
          <IconTrash size={24} className={classes.deleteIcon} />
        </ActionIcon>
      </Group>
    </section>
  )
}
