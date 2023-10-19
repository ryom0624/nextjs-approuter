import { headers, cookies } from 'next/headers'
import SupabaseLister from '../components/supabase-listner'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type {Database} from '../../database.types'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient<Database>({headers, cookies})
  const {
    data: {session}
  } = await supabase.auth.getSession() // get from serverside
  return (
    <>
      <SupabaseLister accessToken={session?.access_token} />
        {children}
    </>
  )
}
