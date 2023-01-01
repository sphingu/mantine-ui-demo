import { useInputState, useSessionStorage } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { TodoInput, TodoList } from '../components'
import { usePageTitle } from '../hooks'
import { todoApi } from '../services'
import { useSessionStore } from '../stores'
import { ITodo } from '../types'

export const About = () => {
  usePageTitle('About')
  const { userInfo } = useSessionStore()
  const [list, setList] = useState<ITodo[]>([])
  const [value, onChange] = useInputState('')

  useEffect(() => {
    fetchList()
  }, [])
  const fetchList = () => {
    todoApi.list().then((list) => {
      setList(list)
    })
  }
  const onAddTodo = () => {
    todoApi.add(value, userInfo?.id as string).then(() => {
      fetchList()
      onChange('')
    })
  }
  return (
    <>
      <h1>About</h1>
      <TodoInput value={value} onChange={onChange} onSubmit={onAddTodo} />
      <TodoList
        items={list}
        onEdit={() => console.log('edit')}
        onDelete={() => console.log('del')}
      />
    </>
  )
}
