import useDisableScroll from "@/hooks/use-disable-scroll";
import { Outlet } from "react-router-dom";

export default function ChatLayout() {

  useDisableScroll(true)

  return (
    <div className="max-sm:absolute max-sm:bottom-0 max-sm:pb-[67px] divide-black/40 sm:border sm:border-black/40 sm:rounded flex h-full w-full flex-col">
      <Outlet />
    </div>
  )
}