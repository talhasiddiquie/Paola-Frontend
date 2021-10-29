import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";

import {
  uploadStarted,
  uploadAdded,
  uploadEnded,
  allUploadsSelected,
  allUploadsUnSelected,
  uploadSelected,
  uploadsDropped,
  singleUploadDropped,
} from "../../store/uploads";
import { bytesToSize } from "../../utils/utilityFunctions";
import FileDropZone from "../FileDropZone/FileDropZone";

const UploadPhotoPanel = () => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const selectedUploads = useSelector((state) =>
    state.uploads.files.filter((value) => value.selected === true)
  );

  const onSelectImage = (id) => dispatch(uploadSelected({ id }));
  const onSelectAllImages = () => dispatch(allUploadsSelected());
  const onUnSelectAllImages = () => dispatch(allUploadsUnSelected());

  return (
    <div className="control-panel">
      <div className="crop-controls">
        <FileDropZone />

        <ImagesContainer
          type="original"
          images={uploads.files}
          selectedType="selected"
          header="Uploaded Images"
          onSelectImage={onSelectImage}
        />

        <div className="crop-controls-info">
          <p>Total images uploaded: {uploads.files.length}</p>
          <p>Total images selected: {selectedUploads.length}</p>
        </div>
        <div
          className="crop-controls-info"
          style={{ justifyContent: "center" }}
        >
          <p>Total upload size: {uploads.totalUploadSize}</p>
        </div>

        <div className="crop-controls-buttons">
          <Button variant="contained" onClick={onSelectAllImages}>
            select all images
          </Button>
          <Button variant="contained" onClick={onUnSelectAllImages}>
            unselect all images
          </Button>
        </div>
      </div>

      <ControlPanelTip
        tip={`Tip: Select images you want to crop and drag them on the artboard. Your total upload size is ${uploads.totalUploadSize}, please keep in mind the larger the upload size the more slow the app gets.`}
      />
    </div>
  );
};

export default UploadPhotoPanel;
