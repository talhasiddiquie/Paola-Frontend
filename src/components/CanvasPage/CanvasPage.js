import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import Cropper from "react-cropper";
import { ItemTypes } from "../../utils/ItemTypes";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadReseted,
  uploadsSorted,
  uploadUnDropped,
} from "../../store/uploads";
import ReactTooltip from "react-tooltip";

const CanvasPage = (props) => {
  const { index, image, pageNumber, setCroppers, getCropperInstance } = props;

  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.IMAGE,
      canDrop: () => true,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const onImageRemove = () => {
    // dispatch(uploadUnDropped({ id: index }));
    dispatch(uploadReseted({ id: index }));
    setCroppers((prevState) =>
      prevState.map((value, i) => (i === index ? null : value))
    );
  };

  const onImageMoveUp = () =>
    dispatch(uploadsSorted({ oldIndex: index, newIndex: index - 1 }));
  const onImageMoveDown = () =>
    dispatch(uploadsSorted({ oldIndex: index, newIndex: index + 1 }));

  return (
    <>
      <div ref={drop} className="canvas-page">
        <div className="canvas-page-icongroup">
          <IconButton
            data-tip="Move picture up"
            onClick={onImageMoveUp}
            aria-label="move-up"
            size="medium"
            disabled={index > 0 ? false : true}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            data-tip="Move picture down"
            onClick={onImageMoveDown}
            aria-label="move-down"
            size="medium"
            disabled={index >= uploads.files.length - 1 ? true : false}
          >
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton
            onClick={onImageRemove}
            aria-label="remove"
            size="medium"
            data-tip="remove picture"
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
        <Cropper
          src={image}
          viewMode={3}
          dragMode="move"
          wheelZoomRatio={0.05}
          initialAspectRatio={1 / 1}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "teal",
          }}
          minCropBoxHeight={500}
          minCropBoxWidth={500}
          onInitialized={(instance) => {
            setTimeout(() => {
              console.log(instance);
            }, 500);
            if (getCropperInstance) {
              getCropperInstance(instance);
            }
          }}
        />
      </div>
      <p>Page {pageNumber + 1}</p>
      <ReactTooltip />
    </>
  );
};

export default CanvasPage;
