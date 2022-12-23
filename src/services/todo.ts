import { notifyHelper } from '../helpers'
import { supabase } from '../supabaseClient'

const queries = {
  list: async () =>
    await supabase.from('todos').select('*').order('id', { ascending: false }),
  add: async (task: string, userId: string) =>
    supabase.from('todos').insert({ task, user_id: userId }).single(),
  delete: async (id: number) => supabase.from('todos').delete().eq('id', id),
  update: async (id: number, isCompleted: boolean) =>
    await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', id)
      .single(),
}

export const add = async (task: string, userId: string) => {
  await notifyHelper.asynchronous(() => queries.add(task, userId))()
}
export const update = async (id: number, completed: boolean) => {
  await notifyHelper.asynchronous(() => queries.update(id, completed))()
}
export const remove = async (id: number) => {
  await notifyHelper.asynchronous(() => queries.delete(id))()
}
export const list = async () => {
  let { data: todos, error } = await notifyHelper.asynchronous(queries.list)()
  console.error(error)
  return todos ?? []
}
