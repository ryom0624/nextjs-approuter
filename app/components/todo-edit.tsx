'use client'

import { useEffect, useState, FormEvent } from "react"
import { useRouter } from 'next/navigation'
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import useStore from '../../store'
import supabase from '../../utils/supabase'

export default function EditTask() {
  const router = useRouter()
  const { editTask } = useStore()
  const { loginUser } = useStore()
  const updateTask = useStore(state => state.updateTask)
  const reset = useStore(state => state.resetTask)

  function signOut() {
    supabase.auth.signOut()
    router.push('/auth')
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(editTask.id === '') {
      const { error } = await supabase.from('todos').insert({title: editTask.title, user_id: loginUser.id})
      router.refresh()
      reset()
    } else {
      const { error } = await supabase.from('todos').update({title: editTask.title}).eq('id', editTask.id)
      router.refresh()
      reset()
    }
  }

  return (
    <div className="m-5 text-center">
      <p className="my-3">{loginUser.email}</p>
      <div className="flex justify-center">
        <ArrowRightOnRectangleIcon
          className="my-3 h-6 w-6 cursor-pointer text-blue-500"
          onClick={() => signOut()}
        />
      </div>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus-outline-none"
          placeholder="New task?"
          value={editTask.title || ''}
          onChange={(e) => updateTask({...editTask, title: e.target.value})}
        />
        <button
          type="submit"
          className="ml-2 rounded text-sm font-medium px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white"
        >
          {editTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>


    </div>
  )
}
