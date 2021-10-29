import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  croppedImagesAdded,
  getDroppedFiles,
  getSelectedFiles,
} from "../../store/uploads";
import { useDrop } from "react-dnd";
import Overlay from "../Overlay/Overlay";
import { ItemTypes } from "../../utils/ItemTypes";
// eslint-disable-next-line import/no-webpack-loader-syntax
// import worker from "workerize-loader!./worker";
import CanvasHandle from "../CanvasHandle/CanvasHandle";
import CanvasGallery from "../CanvasGallery/CanvasGallery";
import CanvasMultiSplit from "../CanvasMultiSplit/CanvasMultiSplit";

import CanvasUploadAndCrop from "../CanvasUpload&Crop/CanvasUploadAndCrop";

const Canvas = (props) => {
  const dispatch = useDispatch();
  const { active, croppers, setCroppers } = props;
  const [selectedFiles, setSelectedFiles] = useState(0);

  const renderCanvas = () => {
    switch (active) {
      case 0:
        return (
          <CanvasUploadAndCrop croppers={croppers} setCroppers={setCroppers} />
        );
      case 1:
        return <CanvasHandle />;
      case 2:
        return <CanvasMultiSplit />;
      case 3:
        return <CanvasGallery />;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   setSelectedFiles(getSelectedFiles(uploads).length);
  // }, [uploads]);

  return <>{renderCanvas()}</>;
};

export default Canvas;
