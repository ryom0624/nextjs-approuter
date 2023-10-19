import BlogListStatic from "../components/blog-list-static";
import RefreshButton from "../components/refresh-button";


export default function BlogLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200 p-2`}>
        <BlogListStatic />
        <div className="flex justify-center">
          <RefreshButton />
        </div>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}
