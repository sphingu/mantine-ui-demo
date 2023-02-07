import { supabase } from '../../supabaseClient'
import { ITodo } from '../../types'

export const todoApi = {
  list: async () => {
    const response = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false })
    return (
      response.data?.map(
        (item) =>
          ({
            id: item.id,
            name: item.task as string,
            completed: item.is_complete as boolean,
          } as ITodo)
      ) || []
    )
  },
  add: async (data: { task: string; userId: string }) =>
    supabase
      .from('todos')
      .insert({ task: data.task, user_id: data.userId })
      .single(),
  remove: async (id: number) => supabase.from('todos').delete().eq('id', id),
  markAsComplete: async (data: { id: number; isCompleted: boolean }) =>
    await supabase
      .from('todos')
      .update({ is_complete: data.isCompleted })
      .eq('id', data.id)
      .single(),
}
