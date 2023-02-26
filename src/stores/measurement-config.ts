import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export const useMeasurementConfigStore = create<{
  selectedId?: number
  isDrawerOpen: boolean
  toggleOpenDrawer: (id?: number) => void
}>()(
  devtools(
    immer((set) => ({
      isDrawerOpen: false,
      toggleOpenDrawer(id?: number) {
        set((state) => {
          if (id) {
            // open drawer for edit case
            state.selectedId = id
            state.isDrawerOpen = true
          } else {
            state.isDrawerOpen = !state.isDrawerOpen
            state.selectedId = undefined
          }
        })
      },
    })),
    { name: 'measurementConfig-store' }
  )
)
