import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IntervalState {
  intervalValue: number
}

export const initialState: IntervalState = {
  intervalValue: 1,
}

export const intervalSlice = createSlice({
  name: "interval",
  initialState,
  reducers: {
    setIntervalValue: (state, action: PayloadAction<number>) => {
      state.intervalValue = action.payload
    },
  },
})

// export the action
export const intervalAction = intervalSlice.actions

export const { setIntervalValue } = intervalSlice.actions

export default intervalSlice.reducer
