'use client'

import { useEffect } from "react"

 
export default function GlobalError({
  error,
}: {
  error: Error
}) {

  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className="text-3xl upper">Could not get chat</h1>
      <p>{error.message}</p>
    </div>
  )
}