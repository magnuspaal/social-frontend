'use client'

import useClientApiService from "@/services/client/client-api-service"
import { User } from "@/types/user"
import Image from "next/image"
import { useState } from "react"
import UserPreview from "@/components/common/UserPreview"
import useTranslation from "@/lang/use-translation"

export default function Search() {

  const { t } = useTranslation()
  const clientApiService = useClientApiService()

  const [result, setResult] = useState<User[]>([])
  const [currentTimeout, setCurrentTimout] = useState<any>(null)
  const [searchFailed, setSearchFailed] = useState(false)

  const search = (evt: any) => {
    setSearchFailed(false)
    clearTimeout(currentTimeout)
    if (evt.target?.value) {
      const timeout = setTimeout(() => {
        submitSearch(evt.target?.value)
      }, 800)
      setCurrentTimout(timeout)
    }
  }

  const submitSearch = (keyword: string) => {
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
          placeholder={t('search.search')}
          className="overflow-auto mx-7 text-xl bg-background focus:outline-0" 
        />
      </div>
      <div className={result.length ? `flex mx-2 mt-5 mb-2` : ''}>
      {
        searchFailed ?
        <div className="font-bold">
          {t('search.messages.default')}
        </div>
        :
        <div className="w-full space-y-4">
          {result.map((user) => <UserPreview user={user} key={user.id}/>)}
        </div>
      }
      </div>
    </div>
  )
}