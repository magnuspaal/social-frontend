'use client'

import useClientApiService from "@/services/client-api-service"
import { User } from "@/types/user"
import Image from "next/image"
import { useState } from "react"
import AccountPreview from "../right-side-bar/AccountPreview"

export default function Search({ dict }: {dict: any}) {

  const clientApiService = useClientApiService()

  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState<User[]>([])
  const [currentTimeout, setCurrentTimout] = useState<any>(null)
  const [searchFailed, setSearchFailed] = useState(false)

  const search = (evt: any) => {
    setSearchFailed(false)
    setKeyword(evt.target?.value)
    clearTimeout(currentTimeout)
    const timeout = setTimeout(() => {
      submitSearch()
    }, 700)
    setCurrentTimout(timeout)
  }

  const submitSearch = () => {
    clientApiService.search(keyword)
      .then((response) => setResult(response.users))
      .catch(() => setSearchFailed(true))
  }

  return (
    <div>
      <div className="flex border border-black/40 rounded p-3">
        <Image src="/search.svg" alt="home" width={25} height={25} />
        <input 
          onChange={search} 
          placeholder={dict.search.search}
          className="overflow-auto mx-7 text-xl bg-background focus:outline-0" 
        />
      </div>
      {
        searchFailed ?
        <div>
          {dict.search.messages.default}
        </div>
        :
        <div>
          {result.map((user) => <AccountPreview account={user} key={user.id}/>)}
        </div>
      }
    </div>
  )
}