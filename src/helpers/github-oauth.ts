import { User } from '@supabase/supabase-js'
import { notifyHelper } from '.'
import { supabase } from '../supabaseClient'

export const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  if (error) {
    notifyHelper.error('Received error while trying to login')
    console.error(error)
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    notifyHelper.error('Received error while trying to logout')
    console.error(error)
  } else {
    notifyHelper.success('You have been successfully logged out')
  }
}

export const getUserInfo = async (): Promise<User> => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    notifyHelper.error('Received error getting your login information')
    throw Error('Something went wrong')
  }
  return data.user
}

export const onAuthStatusChange = (setUserInfo: (user?: User) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      setUserInfo(session.user)
    } else {
      // TODO: handle error
    }
  })
}
