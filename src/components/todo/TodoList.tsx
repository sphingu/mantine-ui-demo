import {
  Center,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core'
import { useTodoListQuery } from '../../services'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const { data: items = [], isLoading } = useTodoListQuery()
  if (isLoading && !items.length) {
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
        <LoadingOverlay visible={isLoading} />
        {items.map((todo) => (
          <TodoItem
            name={todo.name}
            key={todo.id}
            id={todo.id}
            isCompleted={todo.completed}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
