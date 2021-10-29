import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AppsIcon from "@material-ui/icons/Apps";

const ImageGalleryCanvas = (props) => {
  const canvasRef = useRef(null);
  const {
    index,
    image,
    handle,
    fontSize,
    handleColor,
    onEditHandle,
    onDeleteImage,
    onMultiSplitImage,
  } = props;
  const [canvasImage, setCanvasImage] = useState(null);

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageToDraw = new Image();
    imageToDraw.onload = () => {
      context.fillStyle = handleColor ? handleColor : "orange";
      context.font = `${fontSize}px Arial`;
      context.textAlign = "center";

      context.drawImage(imageToDraw, 0, 0);
      context.fillText(
        handle ? handle : "",
        canvas.width / 2,
        canvas.height / 1.1
      );
    };
    imageToDraw.src = image;
  };

  useEffect(() => {
    if (image) drawImageOnCanvas();
  }, [image]);

  return (
    <div className="canvas-gallery-imagewrapper">
      <canvas
        width={500}
        height={500}
        ref={canvasRef}
        className="canvas-gallery-img"
      />
      <div className="canvas-gallery-icons">
        <IconButton
          size="medium"
          aria-label="close"
          id="modal-close-icon"
          data-tip="Edit Hanlde"
          onClick={() =>
            onEditHandle(index, {
              handle: handle ? handle : "",
              color: handleColor,
              fontSize: fontSize ? fontSize : 32,
            })
          }
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="medium"
          aria-label="close"
          id="modal-close-icon"
          data-tip="Split Picture"
          onClick={() => onMultiSplitImage(index)}
        >
          <AppsIcon />
        </IconButton>
        <IconButton
          size="medium"
          aria-label="close"
          id="modal-close-icon"
          data-tip="Delete Picture"
          onClick={() => onDeleteImage(index)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageGalleryCanvas;
