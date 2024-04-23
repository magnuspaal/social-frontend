

import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker({color, setColor, scrollElement}: {color: string, setColor: Dispatch<SetStateAction<string>>, scrollElement: MutableRefObject<HTMLDivElement | null>}) {

  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (color: {hex: string}) => {
    setColor(color.hex);
  };

  const toggleOpen = () => {
    setOpen(!open)

    if (scrollElement.current) {
      if (!open) {
        scrollElement.current.style.overflowY = 'hidden';
      } else {
        scrollElement.current.style.overflowY = 'auto';
      }
    }
  }

  return (
    <div>
      <div className="flex rounded justify-center items-center w-8 m-1">
        <div onClick={toggleOpen} className="w-8 h-6 rounded cursor-pointer border border-black/60" style={{background: `${color}`}} />
      </div>
      {
        open &&
        <div className=''>
          <div className="fixed top-0 bottom-0 left-0 right-0" onClick={toggleOpen}></div>
          <ChromePicker
            className={`absolute right-0 left-0 mr-auto ml-auto top-[50%]`}
            color={color}
            onChange={handleChange}
          />
        </div>
      }
    </div>
  )
}