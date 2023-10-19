'use client'
import { useEffect, useState } from 'react'

export default function TimeCounter() {
  const [time, setTime] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1)
    }, 500)
    return () => clearInterval(interval)
  }, [time])
  return (
    <div className="text-center">
      <p>{time}</p>
      <button
        className='font-sm my-3 rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700'
        onClick={() => {
          setTime(0)
        }}
      >reset</button>
    </div>
  )
}
