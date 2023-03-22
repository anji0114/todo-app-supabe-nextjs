import { NextPage } from 'next'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'

const Dashboard: NextPage = () => {
  const sightOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title="">
      <ArrowRightOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={sightOut}
      />
    </Layout>
  )
}

export default Dashboard
