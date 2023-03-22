import { FC, useEffect, useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store/store'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { Notice } from '../types/types'
import { useGetUser } from '../hooks/useGetUser'
import { supabase } from '../utils/supabase'

export const NoticeItem: FC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const update = useStore((state) => state.updateEditedNotice)
  const { deleteNoticeMutation } = useMutateNotice()
  const [userId, setUserId] = useState<string | undefined>()

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id
      setUserId(userId)
    }

    getUserId()
  }, [])

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoticeMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
