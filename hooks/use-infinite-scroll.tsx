'use client'

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RefObject, useCallback, useEffect, useRef } from "react";

const useInfiniteScroll = (
  getFunction: Function, 
  stateFunction: (state: any) => any,
  clearFunction: Function,
  addFunction: Function,
  scrollElement?: RefObject<HTMLDivElement>,
  options?: { id: number, limit: number}) => {

  const elements = useAppSelector(stateFunction);
  const loadingMoreElements = useRef(false)
  const endOfElements = useRef(false)

  const timeout = useRef<NodeJS.Timeout>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearFunction(options?.id))
  }, [])

  useEffect(() => {
    const fetchElements = async () => {
      if (!loadingMoreElements.current) {
        loadingMoreElements.current = true
        const newElements = await getFunction(0, options?.limit ?? 10, options?.id)
        if (newElements?.length) {
          dispatch(addFunction(newElements))
        }
        loadingMoreElements.current = false
      }
    }
    fetchElements()
  },  [])

  const getMoreElements = useCallback(async() => {
    if (!endOfElements.current && !loadingMoreElements.current) {
      loadingMoreElements.current = true
      const newPosts = await getFunction(elements.length, 10, options?.id)
        .catch((error: any) => console.log(error))
      if (newPosts?.length) {
        dispatch(addFunction(newPosts))
      } else {
        endOfElements.current = true
      }
      loadingMoreElements.current = false
    }
  }, [getFunction, elements, options?.id, dispatch, addFunction])

  const handleScroll = useCallback(() => {
    let bottom: boolean = false
    if (scrollElement?.current) {
      bottom = Math.ceil(-scrollElement.current.scrollTop + 20) >= scrollElement.current.scrollHeight - scrollElement.current.offsetHeight
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
    const element = scrollElement?.current ?? window
    element.addEventListener('scroll', scrollDebounce, {
      passive: true
    });
    return () => {
      element.removeEventListener('scroll', scrollDebounce);
    };
  }, [handleScroll, scrollDebounce, scrollElement]);

  return [elements, endOfElements]
} 

export default useInfiniteScroll;