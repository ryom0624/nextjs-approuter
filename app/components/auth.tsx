'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import supabase from '../../utils/supabase'
import useStore from '../../store'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/auth/todo-crud')
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/')
      }
    }
  }
  function signOut() {
    supabase.auth.signOut()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{loginUser.email}</p>
      <ArrowRightOnRectangleIcon className="my-6 h-6 w-6 cursor-pointer text-blue-500" onClick={signOut}/>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outlune-none"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outlune-none"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indego-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
      <p onClick={() => setLogin(!isLogin)} className="mt-4 cursor-pointer text-blue-500 hover:underline">
        change mode ?
      </p>
    </div>
  )
}
