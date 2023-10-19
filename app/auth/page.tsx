import Auth from '../components/auth'

export default async function AuthPage() {
  return (
    <main
      className={`flex flex-col h-[calc(100vh-56px)] items-center justify-center`}
    >
      <Auth />
    </main>
  )
}
