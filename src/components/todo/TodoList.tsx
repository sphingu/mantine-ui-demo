import { ScrollArea, Stack } from '@mantine/core'
import { useState } from 'react'
import { IRequest } from '../../types'
import { TodoItem } from './TodoItem'

interface Props {
  items: IRequest[]
  onEdit: (request: IRequest) => void
  onDelete: (requestId: string) => void
}

interface ITodo {
  id: string
  name: string
  completed: boolean
}

export function TodoList({ items, onEdit, onDelete }: Props) {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: '1',
      name: 'First One',
      completed: false,
    },
    {
      id: '2',
      name: 'Second One',
      completed: true,
    },
    {
      id: '3',
      name: 'Third One',
      completed: false,
    },
    {
      id: '4',
      name: 'Third One',
      completed: false,
    },
    {
      id: '5',
      name: 'Third One',
      completed: false,
    },
    {
      id: '6',
      name: 'Third One',
      completed: false,
    },
    {
      id: '7',
      name: 'Third One',
      completed: false,
    },
    {
      id: '8',
      name: 'Third One',
      completed: false,
    },
    {
      id: '9',
      name: 'Third One',
      completed: false,
    },
    {
      id: '10',
      name: 'Third One',
      completed: false,
    },
    {
      id: '11',
      name: 'Third One',
      completed: false,
    },
    {
      id: '12',
      name: 'Third One',
      completed: false,
    },
    {
      id: '13',
      name: 'Third One',
      completed: false,
    },
    {
      id: '14',
      name: 'Third One',
      completed: false,
    },
    {
      id: '15',
      name: 'Third One',
      completed: false,
    },
    {
      id: '17',
      name: 'Third One',
      completed: false,
    },
    {
      id: '18',
      name: 'Third One',
      completed: false,
    },
  ])
  function toggleMarkAsCompleted(id: string) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    )
  }
  return (
    <ScrollArea>
      <Stack justify="flex-start" spacing="xs" p="xs">
        {todos.map((todo) => (
          <TodoItem
            name={todo.name}
            key={todo.id}
            isCompleted={todo.completed}
            onClick={() => toggleMarkAsCompleted(todo.id)}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
