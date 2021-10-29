import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ImageGalleryCanvas from "../ImageGalleryCanvas/ImageGalleryCanvas";
import { IconButton } from "@material-ui/core";
import gallery_svg from "../../assets/illustrations/gallery.svg";
import { activeTabChanged } from "../../store/UI";
import ReactTooltip from "react-tooltip";
import {
  imageSelectedForCropPreview,
  imageSelectedForHandlePreview,
  uploadReseted,
} from "../../store/uploads";
import { handleControlsChanged } from "../../store/handleControls";

const CanvasGallery = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("row");
  const [selected, setSelected] = useState([]);
  const uploads = useSelector((state) => state.uploads);

  const onEditHandle = (id, handleContorls) => {
    dispatch(activeTabChanged(1));
    dispatch(handleControlsChanged(handleContorls));
    dispatch(imageSelectedForHandlePreview({ id }));
  };

  const onDeleteImage = (id) => dispatch(uploadReseted({ id }));

  const onMultiSplitImage = (id) => {
    dispatch(activeTabChanged(2));
    dispatch(imageSelectedForCropPreview({ id }));
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setSelected(uploads.files.filter((value) => value.croppedURL));
  }, [uploads]);

  return (
    <div className="canvas">
      <p className="canvas-header">Gallery</p>
      <div className="canvas-gallery-layout-buttons">
        <IconButton data-tip="Row Layout" onClick={() => setLayout("row")}>
          <ViewColumnIcon fontSize="large" />
        </IconButton>
        <IconButton
          data-tip="Column Layout"
          onClick={() => setLayout("column")}
        >
          <ViewStreamIcon fontSize="large" />
        </IconButton>
      </div>

      {selected.length >= 1 ? (
        <div className="canvas-gallery" style={{ flexDirection: layout }}>
          {selected.map((value, index) => {
            return (
              <div key={index} ref={value.focused ? canvasRef : null}>
                <ImageGalleryCanvas
                  index={value.id}
                  handle={value.handle}
                  image={value.croppedURL}
                  fontSize={value.fontSize}
                  onEditHandle={onEditHandle}
                  onDeleteImage={onDeleteImage}
                  handleColor={value.handleColor}
                  onMultiSplitImage={onMultiSplitImage}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="canvas-illustration">
          <img alt="blank-canvas" src={gallery_svg} />
          <p>
            Be creative!{" "}
            <button onClick={() => dispatch(activeTabChanged(0))}>
              Let it shine, Click Me.
            </button>
          </p>
        </div>
      )}
      <ReactTooltip />
    </div>
  );
};

export default CanvasGallery;
