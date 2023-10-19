
import { notFound } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import type { Database } from '@/database.types'

type TodoProps = {
  params: {
    todoId: string
  }
}

export default async function TodoPage({ params }: TodoProps) {

  const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies })
  const { data: todo, error } = await supabase.from('todos').select('*').eq('id', params.todoId).single()

  if(!todo) {
    return notFound()
  }

  return (
    <div className='mt-16 border-2 p-8'>
      <p>TaskID: {todo.id}</p>
      <p>TaskName: {todo.title}</p>
      <p>Completed: {todo.completed ? 'done' : 'not yet'}</p>
      <p>Created At: {' '}
        {todo && format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  )
}
