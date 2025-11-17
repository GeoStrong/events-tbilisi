import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  map: google.maps.Map | null;
  latLng: google.maps.LatLngLiteral | null;
  isFloatingEnabled: boolean;
} = {
  map: null,
  latLng: null,
  isFloatingEnabled: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<google.maps.Map>) => {
      state.map = action.payload;
    },
    setLatLng: (state, action: PayloadAction<google.maps.LatLngLiteral>) => {
      state.latLng = action.payload;
    },
    setIsFloatingEnabled: (state, action: PayloadAction<boolean>) => {
      state.isFloatingEnabled = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const mapActions = mapSlice.actions;
const mapReducer = mapSlice.reducer;

export default mapReducer;
