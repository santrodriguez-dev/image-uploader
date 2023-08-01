'use client'
// import { useEffect, useState } from 'react'

export function Loader () {
  // const [progress, setProgress] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(prog => prog + 5)
  //   }, 100)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <>
      <h4 className="text-2xl font-bold mb-4 self-start">Uploading...</h4>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${75}%` }}></div>
      </div>
    </>
  )
}
