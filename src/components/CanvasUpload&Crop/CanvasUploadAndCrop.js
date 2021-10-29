import { Button, IconButton } from "@material-ui/core";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { croppedImagesAdded, getDroppedFiles } from "../../store/uploads";
import { ItemTypes } from "../../utils/ItemTypes";
import CanvasPage from "../CanvasPage/CanvasPage";
import Overlay from "../Overlay/Overlay";
import VoidSVG from "../../assets/illustrations/void.svg";
import AddBoxIcon from "@material-ui/icons/AddBox";

const CanvasUploadAndCrop = (props) => {
  const dispatch = useDispatch();
  let { croppers, setCroppers } = props;
  const uploads = useSelector((state) => state.uploads);

  const onCropImages = async () => {
    window.performance.mark("cropStart");

    const uploadsCopy = uploads.files.map((value) => ({ ...value }));
    croppers.forEach((value, index) => {
      uploadsCopy[index].croppedURL = value
        .getCroppedCanvas()
        .toDataURL("image/jpeg", 0.8);
    });
    dispatch(croppedImagesAdded({ uploadsCopy }));

    window.performance.mark("cropEnd");
    window.performance.measure("cropMeasure", "cropStart", "cropEnd");
  };

  const renderCanvasPages = () =>
    getDroppedFiles(uploads).length !== 0 ? (
      uploads.files.map((value, index) => {
        if (value.dropped)
          return (
            <CanvasPage
              key={index}
              index={value.id}
              image={value.url}
              pageNumber={index}
              setCroppers={setCroppers}
              getCropperInstance={(cropper) =>
                setCroppers((prevState) => {
                  if (index === 0) {
                    return [cropper];
                  } else {
                    let temp = [...prevState];
                    temp[value.id] = cropper;
                    return temp;
                  }
                  // else return [...prevState, cropper];
                })
              }
            />
          );
      })
    ) : (
      <div className="canvas-illustration">
        <img alt="blank-canvas" src={VoidSVG} />
        <p>No images dropped! There is only void.</p>
      </div>
    );

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div ref={drop} className="canvas">
      <p className="canvas-header">Crop Pictures</p>
      {canDrop && <Overlay type="Legal" />}

      {renderCanvasPages()}

      <Button
        variant="contained"
        onClick={onCropImages}
        className="canvas-action-button"
      >
        Crop Photos
      </Button>

      {canDrop && (
        <>
          <IconButton id="canvas-add-icon--1" size="medium">
            <AddBoxIcon fontSize="large" />
          </IconButton>
          <IconButton id="canvas-add-icon--2">
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default CanvasUploadAndCrop;
