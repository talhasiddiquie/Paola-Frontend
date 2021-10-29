import { createSelector, createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "croppedImages",
  initialState: {
    files: [],
    loading: false,
  },
  reducers: {
    // actions => action handlers
    croppingStarted: (croppedImages, action) => {
      croppedImages.loading = true;
    },
    croppedImageAdded: (croppedImages, action) => {
      const croppedImage = { ...action.payload, id: lastId };
      croppedImages.files.push(croppedImage);
      lastId++;
    },
    croppedImagesAdded: (croppedImages, action) => {
      croppedImages.files.push(...action.payload);
      lastId = action.payload.lastId++;
    },
    croppedImageFocused: (croppedImages, action) => {
      let focusedCroppedImage = croppedImages.files.findIndex(
        (value) => value.focused === true
      );
      let toBeFocusedCroppedImage = croppedImages.files.findIndex(
        (file) => file.id === action.payload.id
      );

      if (focusedCroppedImage !== -1) {
        croppedImages.files[focusedCroppedImage].focused = false;
      }
      croppedImages.files[toBeFocusedCroppedImage].focused = true;
    },
    croppedImagesSorted: (croppedImages, action) => {
      let temp = { ...croppedImages.files[action.payload.dropedOn] };

      croppedImages.files[action.payload.dropedOn].url =
        croppedImages.files[action.payload.dragged].url;

      croppedImages.files[action.payload.dragged].url = temp.url;
    },
    croppingEnded: (croppedImages, action) => {
      croppedImages.loading = false;
    },
    croppedImageSelectForHandle: (croppedImages, action) => {
      let selected = croppedImages.files.findIndex(
        (value) => value.selectedForHandle === true
      );

      if (selected >= 0)
        croppedImages.files[selected].selectedForHandle = false;

      croppedImages.files[action.payload.id].selectedForHandle = true;
    },
    handleAddedOverCroppedImage: (croppedImages, action) => {
      let selected = croppedImages.files.findIndex(
        (value) => value.selectedForHandle === true
      );

      if (selected >= 0) croppedImages.files[selected].url = action.payload.url;
    },
    handleAddedOverAllCroppedImages: (croppedImages, action) => {},
  },
});

export const {
  croppingStarted,
  croppedImageAdded,
  croppedImagesAdded,
  croppedImageFocused,
  croppingEnded,
  croppedImagesSorted,
  croppedImageSelectForHandle,
} = slice.actions;
export default slice.reducer;
