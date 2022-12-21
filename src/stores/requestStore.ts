import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { IRequestStore } from '../types'

export const useRequestStore = create<IRequestStore>()(
  devtools(
    immer((set) => ({
      list: {},
      add(request) {
        set((state) => {
          state.list[request.id] = request
        })
      },
      update(request) {
        set((state) => {
          state.list[request.id] = { ...state.list[request.id], ...request }
        })
      },
      delete(requestId) {
        set((state) => {
          delete state.list[requestId]
        })
      },
    }))
  )
)
