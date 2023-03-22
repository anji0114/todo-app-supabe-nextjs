import { supabase } from '../utils/supabase'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useGetUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
    }
    getUserInfo()
  }, [])

  return user
}
