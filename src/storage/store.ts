import { configureStore } from "@reduxjs/toolkit"
import intervalReducer from "./slices/intervalSlice"

export const store = configureStore({
  reducer: {
    inetrval: intervalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
