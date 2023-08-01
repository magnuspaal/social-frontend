"use client"
import useAutosizeTextArea from "@/utils/use-auto-size-textarea";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useClientApiService from "@/lib/client-api-service";

export default function ReplyToPost({ postId }: { postId: number }) {

  const router = useRouter()
  const clientApiService = useClientApiService()

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const submitPost = async () => {
    setValue("")
    await clientApiService.postReply(value, postId)
    router.refresh()
  }

  return (
    <div className="flex pb-3 pt-3 items-end max-w-4">
      <textarea 
        onChange={handleChange} 
        placeholder="Type a reply"
        className="textarea w-full overflow-auto m-h-10 p-3 text-xl resize-none h-14 overflow-hidden bg-background focus:outline-0" 
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      <button className="rounded bg-primary p-3 font-bold hover:bg-secondary max-h-12" onClick={submitPost}>POST</button>
    </div>
  )
}