"use client"

import useAutosizeTextArea from "@/utils/use-auto-size-textarea";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addPost } from "@/store/post-slice";
import useClientApiService from "@/services/client-api-service";

export default function SubmitPost() {

  const dispatch = useAppDispatch();

  const clientApiService = useClientApiService()

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const submitPost = async () => {
    setValue("")
    const post = await clientApiService.createPost(value)
    dispatch(addPost(post))
  }

  return (
    <div className="flex border-b-4 border-black rounded mb-5 items-end max-w-2xl">
      <textarea 
        onChange={handleChange} 
        placeholder="What's on your mind?"
        className="textarea w-full overflow-auto m-h-10 p-3 text-xl resize-none h-14 overflow-hidden bg-background focus:outline-0" 
        id="multiliner" 
        name="multiliner"
        ref={textAreaRef}
        value={value}
      ></textarea>
      <button className="rounded-t bg-primary p-3 font-bold hover:bg-secondary hover:text-black max-h-12 text-white" onClick={submitPost}>POST</button>
    </div>
  )
}