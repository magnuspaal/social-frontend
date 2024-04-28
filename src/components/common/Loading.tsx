import { useEffect, useState } from "react"

export default function Loading(params: 
  {className?: string, color?: string, size?: number, borderWidth?: number, noTimeout?: boolean}) {

  const [display, setDisplay] = useState(params.noTimeout)

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true)
    }, 400)
  }, [])

  return (
    <>
      {display &&
        <div className={`flex flex-col ${params.className}`}>
          <div className="flex justify-center"> 
            <span 
              style={{
                width: params.size,
                height: params.size,
                borderWidth: params.borderWidth,
                borderColor: params.color, 
                borderBottomColor: "transparent"
              }} 
              className='loader'>
            </span>
          </div>
        </div>
      }
    </>
  )
}