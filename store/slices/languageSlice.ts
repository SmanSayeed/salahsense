import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LanguageState {
  current: "bn" | "en"
}

const initialState: LanguageState = {
  current: "bn",
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"bn" | "en">) => {
      state.current = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload)
      }
    },
    loadLanguage: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("language") as "bn" | "en" | null
        if (saved) {
          state.current = saved
        }
      }
    },
  },
})

export const { setLanguage, loadLanguage } = languageSlice.actions
export default languageSlice.reducer
