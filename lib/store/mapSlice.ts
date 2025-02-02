import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { map: google.maps.Map | null } = {
  map: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<google.maps.Map>) => {
      state.map = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const mapActions = mapSlice.actions;
const mapReducer = mapSlice.reducer;

export default mapReducer;
