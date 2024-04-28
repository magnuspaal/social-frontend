import { Post } from "@/types/post";
import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    overlayImage: '',
    submitPostOverlay: {},
    fileInputOpen: false
  } as {
    overlayImage: string,
    submitPostOverlay: {open: boolean, replyParent?: Post},
    fileInputOpen: boolean
  },
  reducers: {
    setOverlayImage: (state, action: {payload: string}) => {
      state.overlayImage = action.payload
    },
    clearOverlayImage: (state) => {
      state.overlayImage = ''
    },
    setSubmitPostOverlay: (state, action: {payload: {open: boolean, replyParent?: Post}}) => {
      state.submitPostOverlay = action.payload
    },
    setFileInputOpen: (state, action: {payload: boolean, type: string}) => {
      state.fileInputOpen = action.payload
    }
  }
})

export const { setOverlayImage, clearOverlayImage, setSubmitPostOverlay, setFileInputOpen } = navigationSlice.actions

export default navigationSlice.reducer