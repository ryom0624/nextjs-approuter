import type { Database } from '../../database.types'
import { format } from 'date-fns'

type Note = Database['public']['Tables']['notes']['Row']

async function fetchNotes() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const url = `${process.env.url}/rest/v1/notes?select=*`
  const apikey = process.env.apikey as string
  console.log('url', url)
  console.log('apikey', apikey);
  const res = await fetch(url, {
    headers: new Headers({
      apiKey: apikey
      // Authorization: `Bearer ${process.env.token}`
    }),
    cache: 'no-store',
    // next: { revalidate: 10}
  })
  if(!res.ok) throw new Error('Failed to fetch notes')
  const notes:Note[] = await res.json()
  return notes
}


export default async function NotesList() {
  const notes = await fetchNotes()
  return (
    <div className='text-center'>
      <p className='my-4 pb-3 text-xl font-medium underline underline-offset-4'>
        Notes
      </p>
      <ul className='m-3'>
        {notes.map(note => (
          <li key={note.uuid}>
            <p>{note.title}</p>
            <p>
              <strong className='mr-3' >Created at:</strong>
              {note && format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
