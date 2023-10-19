
export default function FirstLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-10 text-center">
      <p>Layout1</p>
      {children}
    </div>
  )
}
