import { Center, ScrollArea, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import { IRequest, ITodo } from '../../types'
import { TodoItem } from './TodoItem'

interface Props {
  items: ITodo[]
  onEdit: (todo: ITodo) => void
  onDelete: (id: string) => void
}

export function TodoList({ items, onEdit, onDelete }: Props) {
  return (
    <ScrollArea>
      <Stack justify="flex-start" spacing="xs" p="xs">
        {!items.length && (
          <Center>
            <Text c="dimmed"> No records found</Text>
          </Center>
        )}
        {items.map((todo) => (
          <TodoItem
            name={todo.name}
            key={todo.id}
            isCompleted={todo.completed}
            onClick={() => console.log(todo.id)}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
