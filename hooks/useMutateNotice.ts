import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store/store'
import { supabase } from '../utils/supabase'
import { Notice, EditedNotice } from '../types/types'

export const useMutateNotice = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedNotice)

  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('notice').insert(notice)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res: any) => {
        const previousNotices = queryClient.getQueryData<Notice[]>('todos')
        if (previousNotices) {
          queryClient.setQueryData('todos', [...previousNotices, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from('notices')
        .update({ title: notice.content })
        .eq('id', notice.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res: any, variables) => {
        const previousNotice = queryClient.getQueryData<Notice[]>('notices')
        if (previousNotice) {
          queryClient.setQueryData(
            'notices',
            previousNotice.map((notice) =>
              notice.id === variables.id ? res[0] : notice
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousNotices = queryClient.getQueryData<Notice[]>('notices')
        if (previousNotices) {
          queryClient.setQueryData(
            'notices',
            previousNotices.filter((notice) => notice.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return { createNoticeMutation, updateNoticeMutation, deleteNoticeMutation }
}
