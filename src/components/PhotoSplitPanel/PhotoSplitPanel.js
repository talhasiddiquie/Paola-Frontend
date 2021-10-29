import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import {
  allUploadsSelected,
  imageSelectedForCropPreview,
  uploadAdded,
  uploadEnded,
  uploadStarted,
} from "../../store/uploads";
import FileDropZone from "../FileDropZone/FileDropZone";

const PhotoSplitPanel = () => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  const onSelectImage = (id) => dispatch(imageSelectedForCropPreview({ id }));

  const selectedUploads = useSelector((state) =>
    state.uploads.files.filter((value) => value.selected === true)
  );

  return (
    <div className="control-panel">
      <div className="insta-split-controls">
        <ImagesContainer
          type="cropped"
          header="Images"
          images={uploads.files}
          selectedType="selectedForCrop"
          onSelectImage={onSelectImage}
        />

        <div className="crop-controls-info">
          <p>Total images uploaded: {uploads.files.length}</p>
          <p>Total images selected: {selectedUploads.length}</p>
        </div>
      </div>

      <ControlPanelTip tip="Tip: Select images you want to crop and drag them on the artboard." />
    </div>
  );
};

export default PhotoSplitPanel;
