

import ColorPicker from '@/components/common/ColorPicker';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

interface ChatSettingsColorProps {
  description: string, 
  color: string, 
  setColor: Dispatch<SetStateAction<string>>,
  message?: string,
  scrollElement: MutableRefObject<HTMLDivElement | null>
}

export default function ChatSettingsColor({description, color, setColor, message, scrollElement}: ChatSettingsColorProps) {

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between px-2 py-1 rounded w-full'>
        <div className='flex flex-col'>
          <p className='text-sm'>{description}</p>
          {
            message &&
            <div className='text-xs text-red-600'>
              <p>{message}</p>
            </div>
          }
        </div>
        <ColorPicker color={color} setColor={setColor} scrollElement={scrollElement}/>
      </div>
    </div>
  )
}