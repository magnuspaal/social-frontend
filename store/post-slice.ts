import { Post } from "@/types/post";
import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
  } as {
    posts: Post[],
  },
  reducers: {
    addPost: (state, action: {payload: Post, type: string}) => {
      state.posts.unshift(action.payload)
    },
    addPosts: (state, action: {payload: Post[], type: string}) => {
      const filteredPosts = action.payload.filter((payloadPost) => !state.posts.find((post) => payloadPost.id == post.id))
      state.posts.push(...filteredPosts)
    },
    removePost: (state, action: {payload: Post, type: string}) => {
      state.posts = state.posts.filter((post) => action.payload.id != post.id)
    },
    clearPosts: (state) => {
      state.posts = []
    },
    updatePost: (state, action: {payload: Post, type: string}) => {
      state.posts = state.posts.map((post) => {
        if (action.payload.id == post.id) {
          return action.payload;
        } else {
          return post;
        }
      })
    }
  }
})

export const { addPost, addPosts, updatePost, clearPosts, removePost } = postSlice.actions

export default postSlice.reducer