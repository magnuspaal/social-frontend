export default function Loading(params: {className?: string, color?: string, size?: number, borderWidth?: number}) {
  return (
    <div className={`flex h-full flex-col ${params.className}`}>
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
  )
}