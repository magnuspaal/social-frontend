import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useDisableScroll = (
  enabled: boolean,
) => {
  useEffect(() => {
    if (enabled) {
      const scrollbarWidth = (window.innerWidth - document.body.clientWidth);
      document.body.style.overflowY = 'hidden'
      document.body.style.marginRight = `${scrollbarWidth}px`;
      // document.body.style.pointerEvents = `none`;

      return () => {
        document.body.style.overflowY = 'scroll'
        document.body.style.marginRight = 'unset'
        // document.body.style.pointerEvents = `in`;
      }
    }
  }, [enabled]);
};

export default useDisableScroll;
