export default function ChatMessageLoading() {
  return (
    <div className="flex flex-col ml-2">
      <span className="flex h-[16px] w-40 mb-[4px] bg-slate-200 rounded col-span-2 animate-pulse"></span>
      <span className="flex h-[16px] w-20 bg-slate-200 rounded col-span-2 animate-pulse"></span>
    </div>
  )
}