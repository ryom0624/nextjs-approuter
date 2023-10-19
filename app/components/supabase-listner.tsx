'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '../../store'

export default function SupabaseListner({
  accessToken // from server side
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const getUserInfo = async() => {
      const {data} = await supabase.auth.getSession()
      if(data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!
        })
      }
    }
    getUserInfo()
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({
        id: session?.user.id,
        email: session?.user.email!
      })
      // if not match, re-run SC with new token from client
      if(session?.access_token != accessToken) {
        router.refresh()
      }
    })

  }, [accessToken])
  return null
}
