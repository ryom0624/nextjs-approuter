import Counter from '../components/counter'
import type { Database } from '../../database.types'

type News = Database['public']['Tables']['news']['Row']

async function fetchNews() {
  const res = await fetch(`${process.env.url}/rest/v1/news?select=*`, {
    headers: new Headers({
      apiKey: process.env.apikey as string
    }),
  })
  if(!res.ok) throw new Error('Failed to fetch news')
  const news:News[] = await res.json()
  return news
}

export default async function NewsList() {
  const news = await fetchNews()
  return (
    <div className='m-1 border border-blue-500 p-4'>
      <Counter />
      <p className='my-4 pb-3 text-xl font-medium underline underline-offset-4'>
        News
      </p>
      <ul className='m-3'>
        {news.map(news => (
          <li key={news.id}>
            {news.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
