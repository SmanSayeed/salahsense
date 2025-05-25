import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FilterState {
  selectedCategory: number | null
  topicFilter: string
}

const initialState: FilterState = {
  selectedCategory: null,
  topicFilter: "",
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload
    },
    setTopicFilter: (state, action: PayloadAction<string>) => {
      state.topicFilter = action.payload
    },
    clearFilters: (state) => {
      state.selectedCategory = null
      state.topicFilter = ""
    },
  },
})

export const { setSelectedCategory, setTopicFilter, clearFilters } = filterSlice.actions
export default filterSlice.reducer
