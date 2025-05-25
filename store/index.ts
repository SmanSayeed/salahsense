import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { themeReducer } from "./theme-slice"
import { bookmarksReducer } from "./bookmarks-slice"
import { audioReducer } from "./audio-slice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    bookmarks: bookmarksReducer,
    audio: audioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 