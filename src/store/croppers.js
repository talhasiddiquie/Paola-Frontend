import { createSelector, createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "croppers",
  initialState: [],
  reducers: {
    // actions => action handlers
    cropperAdded: (croppers, action) => {
      const cropper = { ...action.payload, id: lastId };
      console.log(cropper);
      // croppers.push(cropper);
      // lastId++;
    },
  },
});

export const { cropperAdded } = slice.actions;
export default slice.reducer;
