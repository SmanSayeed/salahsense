import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface BookmarkState {
  items: number[]
}

const initialState: BookmarkState = {
  items: [],
}

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.items.indexOf(id)

      if (index > -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(id)
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarks", JSON.stringify(state.items))
      }
    },
    loadBookmarks: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("bookmarks")
        if (saved) {
          state.items = JSON.parse(saved)
        }
      }
    },
    clearBookmarks: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.removeItem("bookmarks")
      }
    },
  },
})

export const { toggleBookmark, loadBookmarks, clearBookmarks } = bookmarkSlice.actions
export default bookmarkSlice.reducer
