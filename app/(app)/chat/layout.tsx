export default async function ChatLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="max-sm:absolute max-sm:bottom-0 max-sm:pb-[67px] divide-black/40 border border-black/40 rounded flex h-full w-full flex-col">
      {children}
    </div>
  )
}