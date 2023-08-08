import { createSlice } from "@reduxjs/toolkit";

export enum AlertType {
  ERROR='error',
  SUCCESS='success'
}

export interface Alert {
  index?: number,
  type: AlertType,
  message: string
}

export const alertSlice = createSlice({
  name: 'navigation',
  initialState: {
    alerts: [],
    timeout: null,
    index: 0
  } as {
    alerts: Alert[],
    timeout: NodeJS.Timeout | null,
    index: number
  },
  reducers: {
    addAlert: (state, action: {payload: Alert, type: string}) => {
      const index = state.index
      state.index += 1
      const alert = {...action.payload, index }
      state.alerts.unshift(alert)
      if (state.alerts.length > 1) {
        if (state.timeout) clearTimeout(state.timeout)
        state.alerts.pop()
      }
    },
    removeAlert: (state) => {
      state.alerts.pop()
    },
    addTimeout: (state, action: {payload: NodeJS.Timeout}) => {
      state.timeout = action.payload
    }
  }
})

export const { addAlert, removeAlert, addTimeout } = alertSlice.actions

export default alertSlice.reducer