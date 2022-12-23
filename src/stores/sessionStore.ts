import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'
import { Immutable, setAutoFreeze } from 'immer'
import { githubOAuthHelpers } from '../helpers'

type ISessionStore = Immutable<{
  loading: boolean
  userInfo?: User
  setUserInfo: (userInfo?: User) => void
  setLoading: (value: boolean) => void
  isAuthenticated: () => boolean
  fetchUserInfo: () => Promise<void>
  login: () => Promise<void>
  logOut: () => void
}>

export const useSessionStore = create<ISessionStore>()(
  devtools(
    immer((set, get) => ({
      loading: true,
      userInfo: undefined,
      setUserInfo: (userInfo?: User) => {
        set((state) => {
          state.userInfo = userInfo
        })
      },
      setLoading: (value: boolean) =>
        set((state) => {
          state.loading = value
        }),
      isAuthenticated() {
        return !!get().userInfo
      },
      fetchUserInfo: async () => {
        await githubOAuthHelpers
          .getUserInfo()
          .then((userInfo) => {
            get().setUserInfo(userInfo)
          })
          .finally(() => get().setLoading(false))
      },
      login: async () => {
        await githubOAuthHelpers.signIn().then(() => get().setLoading(true))
      },
      logOut() {
        githubOAuthHelpers.signOut()
      },
    }))
  )
)
