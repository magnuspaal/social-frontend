import { Post } from "@/types/post";
import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    overlayImage: '',
    submitPostOverlay: {}
  } as {
    overlayImage: string,
    submitPostOverlay: {open: boolean, replyParent?: Post}
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
    }
  }
})

export const { setOverlayImage, clearOverlayImage, setSubmitPostOverlay } = navigationSlice.actions

export default navigationSlice.reducer