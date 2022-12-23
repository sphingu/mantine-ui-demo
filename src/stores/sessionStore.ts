import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'
import { Immutable } from 'immer'
import { githubOAuthHelpers } from '../helpers'

type ISessionStore = Immutable<{
  loading: boolean
  userInfo?: User
  setLoading: (value: boolean) => void
  isAuthenticated: () => boolean
  fetchSessionInfo: () => Promise<void>
  login: () => Promise<void>
  logOut: () => void
}>

export const useSessionStore = create<ISessionStore>()(
  devtools(
    immer((set, get) => ({
      loading: true,
      userInfo: undefined,
      setLoading: (value: boolean) =>
        set((state) => {
          state.loading = value
        }),
      isAuthenticated() {
        return !!get().userInfo
      },
      fetchSessionInfo: async () => {
        await githubOAuthHelpers
          .getUserInfo()
          .then((userInfo) => {
            set((state) => {
              state.userInfo = userInfo
            })
          })
          .finally(() => get().setLoading(false))
      },
      login: async () => {
        await githubOAuthHelpers.signIn().then(() => get().setLoading(true))
      },
      logOut() {
        githubOAuthHelpers.signOut().then(() => {
          set((state) => {
            state.userInfo = undefined
          })
        })
      },
    }))
  )
)
