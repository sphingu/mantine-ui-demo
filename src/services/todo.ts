import { notifyHelper } from '../helpers'
import { supabase } from '../supabaseClient'
import { ITodo } from '../types'

const queries = {
  list: async () => {
    const response = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false })
    return (
      response.data?.map(
        (item) =>
          ({
            id: item.id as string,
            name: item.task as string,
            completed: item.is_complete as boolean,
          } as ITodo)
      ) || []
    )
  },
  add: async (task: string, userId: string) =>
    supabase.from('todos').insert({ task, user_id: userId }).single(),
  remove: async (id: number) => supabase.from('todos').delete().eq('id', id),
  update: async (id: number, isCompleted: boolean) =>
    await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', id)
      .single(),
}

export const list = notifyHelper.wrapAsync(queries.list)
export const add = notifyHelper.wrapAsync(queries.add)
export const update = notifyHelper.wrapAsync(queries.update)
export const remove = notifyHelper.wrapAsync(queries.remove)
