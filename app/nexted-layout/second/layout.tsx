
export default function SecondLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-10 text-center">
      <p>Layout2</p>
      {children}
    </div>
  )
}
