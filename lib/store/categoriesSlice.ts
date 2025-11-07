import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../supabase/supabaseClient";



const initialState: { categories: [] } = {
    categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<[]>) => {
      state.categories = action.payload;
    }
  },
});

export const categoriesActions = categoriesSlice.actions;
const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
