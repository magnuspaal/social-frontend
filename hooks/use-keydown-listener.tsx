'use client'

import { useCallback, useEffect } from "react";

const useKeydownListener = (callback: () => Promise<void>, key: string) => {
  const handleEnter = useCallback((event: KeyboardEvent) => {
    if (event.key === key) {
      event.preventDefault()
      callback()
    }
  }, [callback, key])

  useEffect(() => {
    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    }
  }, [handleEnter])
} 

export default useKeydownListener;