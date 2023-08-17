import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    overlayImage: '',
  } as {
    overlayImage: string,
  },
  reducers: {
    setOverlayImage: (state, action: {payload: string}) => {
      state.overlayImage = action.payload
    },
    clearOverlayImage: (state) => {
      state.overlayImage = ''
    }
  }
})

export const { setOverlayImage, clearOverlayImage } = navigationSlice.actions

export default navigationSlice.reducer