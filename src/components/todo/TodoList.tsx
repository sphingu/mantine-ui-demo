import { Center, Loader, ScrollArea, Stack, Text } from '@mantine/core'
import { ITodo } from '../../types'
import { TodoItem } from './TodoItem'

interface Props {
  isLoading: boolean
  items: ITodo[]
  onItemClick: (id: string) => void
}

export function TodoList({ isLoading, items, onItemClick }: Props) {
  if (isLoading) {
    return (
      <Center p="lg">
        <Loader />
        <Text ml="sm" color="dimmed">
          Loading ...
        </Text>
      </Center>
    )
  }
  if (!items.length) {
    return (
      <Center p="lg">
        <Text c="dimmed"> No records found</Text>
      </Center>
    )
  }
  return (
    <ScrollArea>
      <Stack justify="flex-start" spacing="xs" p="xs">
        {items.map((todo) => (
          <TodoItem
            name={todo.name}
            key={todo.id}
            isCompleted={todo.completed}
            onClick={() => onItemClick(todo.id)}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
