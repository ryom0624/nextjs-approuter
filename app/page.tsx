
import { Suspense } from "react"
import Spinner from "./components/spinner"
import NotesList from "./components/notes-list"
import TimeCounter from "./components/time-counter"
import RefreshButton from "./components/refresh-button"

export default function Home() {
  return (
    <main className="text-center">
      <div className="m-10 text-center">Hello World🚀</div>
      {/* streaming html - wrapping with Suspence */}
      <Suspense fallback={<Spinner/>}>
        <NotesList />
      </Suspense>
      <TimeCounter />
      {/* refresh server component without reloading the page.*/}
      <RefreshButton />
    </main>
  )
}
