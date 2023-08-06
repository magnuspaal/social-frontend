'use client'

import { useEffect } from "react"

 
export default function GlobalError({
  error,
}: {
  error: Error
}) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-full flex justify-center items-center">
      <h2>Something went wrong when getting profile</h2>
    </div>
  )
}