import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

export const useCustomerStore = create<{
  selectedId?: number
  setSelectedId: (id?: number) => void
}>()(
  devtools(
    immer((set) => ({
      setSelectedId(id) {
        set((state) => {
          state.selectedId = id
        })
      },
    })),
    { name: 'customer-store' }
  )
)
