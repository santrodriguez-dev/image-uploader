'use client'
import { useEffect, useState } from 'react'

export function Loader () {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prog => {
        if (prog + 2 >= 100) clearInterval(timer)
        return prog + 2
      })
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <h4 className="text-2xl font-bold mb-4 self-start">Uploading...{progress}</h4>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  )
}
