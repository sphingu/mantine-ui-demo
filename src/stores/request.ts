import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import { IRequestStore } from '../types'

export const useRequestStore = create<IRequestStore>()(
  devtools(
    persist(
      immer((set) => ({
        list: {},
        create(request) {
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
      })),
      { name: 'request-store' }
    )
  )
)
