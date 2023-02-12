import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'
import { Immutable } from 'immer'
import { githubOAuthHelpers } from '../helpers'

const mockUserInfo: IUser = {
  id: '0d50ab4a-e8ae-458d-9f9d-8a753c57642d',
  email: 'test@example.com',
  profileImage: 'https://avatars.githubusercontent.com/u/8?v=4',
  fullName: 'Test User',
  userName: 'testuser',
}

type IUser = {
  id: string
  email: string
  profileImage: string
  fullName: string
  userName: string
}

type ISessionStore = Immutable<{
  mock: boolean
  loading: boolean
  userInfo?: IUser
  setMock: (value: boolean) => void
  setUserInfo: (userInfo: User) => void
  setLoading: (value: boolean) => void
  isAuthenticated: () => boolean
  fetchUserInfo: () => Promise<void>
  login: () => Promise<void>
  logOut: () => void
}>

export const useSessionStore = create<ISessionStore>()(
  devtools(
    immer((set, get) => ({
      mock: false,
      loading: true,
      userInfo: undefined,
      setMock: (value: boolean) => set({ mock: value, userInfo: mockUserInfo }),
      setUserInfo: (userInfo: User) => {
        set((state) => {
          state.userInfo = {
            id: userInfo.id,
            email: userInfo.email as string,
            profileImage: userInfo.user_metadata.avatar_url,
            fullName: userInfo.user_metadata.full_name,
            userName: userInfo.user_metadata.user_name,
          }
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
        githubOAuthHelpers
          .signOut()
          .then(() => set({ mock: false, userInfo: undefined }))
      },
    }))
  )
)
