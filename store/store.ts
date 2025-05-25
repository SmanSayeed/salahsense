import { configureStore } from "@reduxjs/toolkit"
import languageReducer from "./slices/languageSlice"
import filterReducer from "./slices/filterSlice"
import bookmarkReducer from "./slices/bookmarkSlice"

export const store = configureStore({
  reducer: {
    language: languageReducer,
    filter: filterReducer,
    bookmarks: bookmarkReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
