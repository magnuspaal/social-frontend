import { Dispatch, SetStateAction, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({color, setColor}: {color: string, setColor: Dispatch<SetStateAction<string>> }) {

  const [open, setOpen] = useState<boolean>(false)

  const fixedElement = useRef<HTMLDivElement>(null);

  const handleChange = (color: string) => {
    setColor(color);
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
        <div>
          <div ref={fixedElement} className="fixed top-0 bottom-0 left-0 right-0" onClick={toggleOpen}></div>
          <div className={`fixed top-0 left-0 right-0 mr-auto ml-auto w-[200px] top-[50%] translate-y-[-50%]`}>
            <HexColorPicker 
              color={color} onChange={handleChange} 
            />
          </div>
        </div>
      }
    </div>
  )
}