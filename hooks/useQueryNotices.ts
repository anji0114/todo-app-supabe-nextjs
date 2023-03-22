import { QueryKey, useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Notice } from '../types/types'

export const useQueryNotices = () => {
  const getNotices = async () => {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  return useQuery<QueryKey, Error, Notice[], QueryKey>({
    queryKey: ['notices'],
    queryFn: getNotices,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
