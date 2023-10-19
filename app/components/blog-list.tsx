import type { Database } from "@/database.types"

type Blog = Database['public']['Tables']['blogs']['Row']

async function FetchBlogs() {
  await new Promise(resolve => setTimeout(resolve, 6000))
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apiKey: process.env.apikey as string
    }),
  })
  if(!res.ok) throw new Error('Failed to fetch blogs')
  const blogs:Blog[] = await res.json()
  return blogs
}


// streaming sr
export default async function BlogList() {
  const blogs = await FetchBlogs()
  return (
    <div className='p-4'>
      <p className='mb-4 pb-3 text-xl font-medium underline underline-offset-4'>
        Blogs
      </p>
      <ul className='text-sm'>
        {blogs?.map(blog => (
          <li key={blog.id} className='my-1 text-base'>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
