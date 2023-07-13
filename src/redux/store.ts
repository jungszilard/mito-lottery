import { configureStore } from "@reduxjs/toolkit"
import intervalReducer from "./slices/intervalSlice"
import lotteryNumberSlice from "./slices/lotteryNumberSlice"

export const store = configureStore({
  reducer: {
    inetrval: intervalReducer,
    lotteryNumber: lotteryNumberSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
