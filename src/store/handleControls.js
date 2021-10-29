import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "handleControls",
  initialState: {
    color: "black",
    handle: "paolo",
    fontSize: "32",
  },
  reducers: {
    colorChanged: (handleControls, action) => {
      handleControls.color = action.payload;
    },
    handleChanged: (handleControls, action) => {
      handleControls.handle = action.payload;
    },
    fontSizeChanged: (handleControls, action) => {
      handleControls.fontSize = action.payload;
    },
    handleControlsChanged: (handleControls, action) => {
      Object.assign(handleControls, action.payload);
    },
  },
});

export const {
  colorChanged,
  handleChanged,
  fontSizeChanged,
  handleControlsChanged,
} = slice.actions;

export default slice.reducer;
