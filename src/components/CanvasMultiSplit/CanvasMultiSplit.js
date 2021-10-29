import { Button } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import Cropper from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import empty_svg from "../../assets/illustrations/empty.svg";
import {
  getLastImageID,
  getSelectedForMultiCrop,
  multiSplitImagesAdded,
} from "../../store/uploads";

const data = {
  1: { top: 0, left: 0, width: 166.66, height: 166.66 },
  2: { top: 0, left: 166.66, width: 166.66, height: 166.66 },
  3: { top: 0, left: 166.66 + 166.66, width: 166.66, height: 166.66 },
  4: { top: 166.66, left: 0, width: 166.66, height: 166.66 },
  5: { top: 166.66, left: 166.66, width: 166.66, height: 166.66 },
  6: { top: 166.66, left: 166.66 + 166.66, width: 166.66, height: 166.66 },
  7: { top: 166.66 + 166.66, left: 0, width: 166.66, height: 166.66 },
  8: { top: 166.66 + 166.66, left: 166.66, width: 166.66, height: 166.66 },
  9: {
    top: 166.66 + 166.66,
    left: 166.66 + 166.66,
    width: 166.66,
    height: 166.66,
  },
  10: {
    top: 0,
    left: 0,
    width: 500,
    height: 500,
  },
};

const CanvasMultiSplit = () => {
  let splits = 1;
  const nineCroppedImages = [];
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [cropper, setCropper] = useState(null);
  const uploads = useSelector((state) => state.uploads);
  const croppedImages = useSelector((state) => state.croppedImages);

  const onStartNineSplit = () => {
    const originalImage = getSelectedForMultiCrop(uploads);
    const cropperInstance = cropper;
    cropper.minCropBoxHeight = 100;
    cropper.minCropBoxWidth = 100;
    cropperInstance.setCropBoxData(data[splits]);

    splits += 1;
    if (splits <= 10) {
      nineCroppedImages.push({
        url: originalImage.url,
        croppedURL: cropperInstance
          .getCroppedCanvas()
          .toDataURL("image/jpeg", 0.8),
        duplicate: true,
      });
      setTimeout(() => {
        onStartNineSplit();
      }, 150);
      return;
    }

    splits = 0;
    appendCroppedImages();
  };

  const appendCroppedImages = () => {
    let lastId = getLastImageID(uploads);

    if (lastId >= 1) lastId++;

    nineCroppedImages.forEach((element) => {
      element.id = lastId;
      lastId++;
    });
    dispatch(multiSplitImagesAdded({ nineCroppedImages, lastId }));
  };

  const getImageSelectedForCrop = () => {
    const index = uploads.files.findIndex(
      (value) => value.selectedForCrop === true
    );

    if (index >= 0) setImage(uploads.files[index].croppedURL);
    if (cropper)
      setTimeout(() => {
        cropper.setCropBoxData({ width: 500, height: 500 });
      }, 100);
  };

  useEffect(() => {
    getImageSelectedForCrop();
  }, [uploads]);

  useEffect(() => {
    if (cropper)
      setTimeout(() => {
        cropper.setCropBoxData({ width: 500, height: 500 });
      }, 100);
  }, [cropper]);

  return (
    <div className="canvas">
      <p className="canvas-header">Multi Image Split</p>

      {image ? (
        <div className="canvas-page">
          <Cropper
            src={image}
            viewMode={3}
            ref={cropper}
            cropBoxMovable={true}
            cropBoxResizable={false}
            // minCropBoxHeight={500}
            // minCropBoxWidth={500}
            initialAspectRatio={1 / 1}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "teal",
            }}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </div>
      ) : (
        <div className="canvas-illustration">
          <img alt="blank-canvas" src={empty_svg} />
          <p>No image choosen! Its all empty.</p>
        </div>
      )}

      <Button
        variant="contained"
        className="canvas-action-button"
        onClick={() => onStartNineSplit(0, 0, 166.66, 166.66)}
      >
        Crop Picture
      </Button>
    </div>
  );
};

export default CanvasMultiSplit;
