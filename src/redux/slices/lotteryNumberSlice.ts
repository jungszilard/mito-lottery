import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface LotteryNumberState {
  isRandomNumber: boolean
  selectedLotteryNumbers: number[]
}

export const initialState: LotteryNumberState = {
  isRandomNumber: false,
  selectedLotteryNumbers: [],
}

export const lotteryNumberSlice = createSlice({
  name: "lotteryNumber",
  initialState,
  reducers: {
    setIsRandomNumber: (state, action: PayloadAction<boolean>) => {
      state.isRandomNumber = action.payload
    },
    setSelectedLotteryNumbers: (state, action: PayloadAction<number[]>) => {
      state.selectedLotteryNumbers = action.payload
    },
  },
})

// export the action
export const lotteryNumberAction = lotteryNumberSlice.actions

export const { setIsRandomNumber, setSelectedLotteryNumbers } =
  lotteryNumberSlice.actions

export default lotteryNumberSlice.reducer
