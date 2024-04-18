

import { Dispatch, SetStateAction, useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker({color, setColor, openUp}: {color: string, setColor: Dispatch<SetStateAction<string>>, openUp?: boolean}) {

  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (color: {hex: string}) => {
    setColor(color.hex);
  };

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="flex rounded justify-center items-center w-8 m-1">
        <div onClick={toggleOpen} className="w-8 h-6 rounded cursor-pointer border border-black/60" style={{background: `${color}`}} />
      </div>
      {
        open &&
        <div className="relative">
          <div className="fixed top-0 bottom-0 left-0 right-0" onClick={toggleOpen}></div>
          <ChromePicker
            className={`absolute ${openUp ? 'bottom-8 right-0' : 'top-0 right-0'}`}
            color={color}
            onChange={handleChange}
          />
        </div>
      }
    </div>
  )
}