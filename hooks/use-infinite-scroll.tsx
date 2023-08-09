'use client'

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPosts, clearPosts } from "@/store/post-slice";
import { useCallback, useEffect, useRef } from "react";

const usePostInfiniteScroll = (getPostsFunction: Function, options?: { userId: number }) => {
  const posts = useAppSelector((state) => state.post.posts);
  const loadingMorePosts = useRef(false)
  const endOfPosts = useRef(false)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearPosts())
  }, [dispatch])

  useEffect(() => {
    const fetchPosts = async () => {
      if (!posts.length && !loadingMorePosts.current) {
        loadingMorePosts.current = true
        const newPosts = await getPostsFunction(0, 10, options?.userId)
        if (newPosts?.length) {
          dispatch(addPosts(newPosts))
        }
        loadingMorePosts.current = false
      }
    }
    fetchPosts()
  }, [dispatch, getPostsFunction, options?.userId, posts.length])

  const getMorePosts = useCallback(async() => {
    if (!endOfPosts.current && !loadingMorePosts.current) {
      loadingMorePosts.current = true
      const newPosts = await getPostsFunction(posts.length, 10, options?.userId)
        .catch((error: any) => console.log(error))
      if (newPosts?.length) {
        dispatch(addPosts(newPosts))
      } else {
        endOfPosts.current = true
      }
      loadingMorePosts.current = false
    }
  }, [getPostsFunction, posts.length, options?.userId, dispatch])

  const handleScroll = useCallback(() => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1000
    if (bottom) {
      getMorePosts()
    }
  }, [getMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {posts, endOfPosts}
} 

export default usePostInfiniteScroll;