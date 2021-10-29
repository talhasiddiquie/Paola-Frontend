import { createSelector, createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "uploads",
  initialState: {
    files: [],
    loading: false,
    totalUploadSize: 0,
  },
  reducers: {
    // actions => action handlers
    uploadStarted: (uploads, action) => {
      uploads.loading = true;
    },
    uploadAdded: (uploads, action) => {
      const upload = { ...action.payload, id: lastId };
      uploads.files.push(upload);
      lastId++;
    },
    uploadSelected: (uploads, action) => {
      let index = uploads.files.findIndex(
        (file) => file.id === action.payload.id
      );
      uploads.files[index].selected = !uploads.files[index].selected;
    },
    uploadsDropped: (uploads, action) => {
      const files = uploads.files.map((value) =>
        value.selected ? { ...value, dropped: true, selected: false } : value
      );
      uploads.files = files;
    },
    singleUploadDropped: (uploads, action) => {
      Object.assign(uploads.files[action.payload.id], { dropped: true });
    },
    uploadUnDropped: (uploads, action) => {
      uploads.files[action.payload.id].dropped = false;
    },
    uploadsAppended: (uploads, action) => {
      uploads.files.push(...action.payload);
    },
    uploadEnded: (uploads, action) => {
      uploads.loading = false;
    },
    croppedImagesAdded: (uploads, action) => {
      uploads.files = [...action.payload.uploadsCopy];
    },
    allUploadsSelected: (uploads, action) => {
      uploads.files.forEach((value) => (value.selected = true));
    },
    allUploadsUnSelected: (uploads, action) => {
      uploads.files.forEach((value) => (value.selected = false));
    },
    uploadsSorted: (uploads, action) => {
      let temp = { ...uploads.files[action.payload.oldIndex] };

      Object.assign(uploads.files[action.payload.oldIndex], {
        url: uploads.files[action.payload.newIndex].url,
        croppedURL: uploads.files[action.payload.newIndex].croppedURL,
      });

      Object.assign(uploads.files[action.payload.newIndex], {
        url: temp.url,
        croppedURL: temp.croppedURL,
      });
    },
    imageFocused: (uploads, action) => {
      let focusedCroppedImage = uploads.files.findIndex(
        (value) => value.focused === true
      );
      let toBeFocusedCroppedImage = uploads.files.findIndex(
        (file) => file.id === action.payload.id
      );

      if (focusedCroppedImage !== -1) {
        uploads.files[focusedCroppedImage].focused = false;
      }
      uploads.files[toBeFocusedCroppedImage].focused = true;
    },
    imageSelectedForHandlePreview: (uploads, action) => {
      let selected = uploads.files.findIndex(
        (value) => value.selectedForHandle === true
      );

      if (selected >= 0) uploads.files[selected].selectedForHandle = false;
      uploads.files[action.payload.id].selectedForHandle = true;
    },
    imageSelectedForCropPreview: (uploads, action) => {
      let selected = uploads.files.findIndex(
        (value) => value.selectedForCrop === true
      );

      if (selected >= 0) uploads.files[selected].selectedForCrop = false;
      uploads.files[action.payload.id].selectedForCrop = true;
    },
    handleAddedOverImage: (uploads, action) => {
      const { handleColor, handle, fontSize } = action.payload;
      const index = uploads.files.findIndex(
        (value) => value.selectedForHandle === true
      );
      Object.assign(uploads.files[index], {
        handleColor,
        handle,
        fontSize,
      });
    },
    handleAddedOverAllImages: (uploads, action) => {
      const { handleColor, handle, fontSize } = action.payload;
      uploads.files.forEach((value) =>
        Object.assign(value, {
          handleColor,
          handle,
          fontSize,
        })
      );
    },
    multiSplitImagesAdded: (uploads, action) => {
      uploads.files = [...uploads.files, ...action.payload.nineCroppedImages];
      lastId = action.payload.lastId;
    },
    uploadSizeAdded: (uploads, action) => {
      uploads.totalUploadSize = action.payload.totalSize;
    },
    uploadReseted: (uploads, action) => {
      uploads.files[action.payload.id] = {
        ...uploads.files[action.payload.id],
        croppedURL: null,
        handle: null,
        handleColor: null,
        fontSize: null,
        dropped: false,
      };
    },
  },
});

export const getLastImageID = createSelector(
  (uploads) => uploads.files,
  (files) => files[files.length - 1].id
);

export const getSelectedFiles = createSelector(
  (uploads) => uploads.files,
  (files) => files.filter((file) => file.selected === true)
);

export const getDroppedFiles = createSelector(
  (uploads) => uploads.files,
  (files) => files.filter((file) => file.dropped)
);

export const getSelectedForMultiCrop = createSelector(
  (uploads) => uploads.files,
  (files) => {
    const fileIndex = files.findIndex(
      (value) => value.selectedForCrop === true
    );
    if (fileIndex >= 0) return files[fileIndex];
    return null;
  }
);

export const {
  uploadEnded,
  uploadAdded,
  imageFocused,
  uploadStarted,
  uploadsSorted,
  uploadReseted,
  uploadSelected,
  uploadsDropped,
  uploadsAppended,
  uploadUnDropped,
  uploadSizeAdded,
  croppedImagesAdded,
  allUploadsSelected,
  singleUploadDropped,
  handleAddedOverImage,
  allUploadsUnSelected,
  multiSplitImagesAdded,
  handleAddedOverAllImages,
  imageSelectedForCropPreview,
  imageSelectedForHandlePreview,
} = slice.actions;
export default slice.reducer;
