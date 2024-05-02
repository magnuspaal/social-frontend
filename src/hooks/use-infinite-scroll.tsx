

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const useInfiniteScroll = (
  getFunction: ((length: number, limit: number, id?: number) => Promise<any[]>), 
  stateFunction: ((state: RootState) => any[]),
  addFunction: ActionCreatorWithPayload<any[], "post/addPosts" | "messaging/addMessages">,
  clearFunction?: ActionCreatorWithoutPayload<"post/clearPosts">,
  scrollElement?: RefObject<HTMLDivElement>,
  options?: { id?: number, limit?: number}) => {

  const [, setError] = useState();

  const elements = useAppSelector(stateFunction);
  const loadingMoreElements = useRef(false)
  const [endOfElements, setEndOfElements] = useState<boolean>(false)

  const timeout = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  const getMoreElements = useCallback(async() => {
    if (!endOfElements && !loadingMoreElements.current) {
      loadingMoreElements.current = true
      const newPosts = await getFunction(elements.length, options?.limit ?? 10, options?.id)
        .catch((error: Error) => setError(() => {throw error}))
      if (newPosts?.length) {
        dispatch(addFunction(newPosts))
      } else {
        setEndOfElements(true)
      }
      loadingMoreElements.current = false
    }
  }, [getFunction, elements, options?.id, dispatch, addFunction])

  const handleScroll = useCallback(() => {
    let bottom: boolean = false
    if (scrollElement?.current) {
      bottom = Math.ceil(-scrollElement.current.scrollTop + 500) >= scrollElement.current.scrollHeight - scrollElement.current.offsetHeight
    } else {
      bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1000
    }

    if (bottom) {
      getMoreElements()
    }
  }, [getMoreElements, scrollElement]);

  const scrollDebounce = useCallback(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      handleScroll()
    }, 50)
  }, [handleScroll])

  useEffect(() => {
    const fetchElements = async () => {
      if (!loadingMoreElements.current) {
      loadingMoreElements.current = true
        const newElements = await getFunction(0, options?.limit ?? 10, options?.id)
          .catch((error: Error) => setError(() => {throw error}))
        if (newElements) {          
          dispatch(addFunction(newElements))
          if (newElements.length < (options?.limit ?? 10)) {
            setEndOfElements(true)
          }
        }
        loadingMoreElements.current = false
      }
    }
    fetchElements()

    return (() => {
      if (clearFunction) dispatch(clearFunction())
    })
  }, [options?.id])

  useEffect(() => {
    scrollDebounce()
  }, [scrollDebounce])

  useEffect(() => {
    const element = scrollElement?.current ?? window
    element.addEventListener('scroll', scrollDebounce, {
      passive: true
    });
    return () => {
      element.removeEventListener('scroll', scrollDebounce);
    };
  }, [handleScroll, scrollDebounce, scrollElement]);

  return {elements, endOfElements}
} 

export default useInfiniteScroll;