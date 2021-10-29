import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ImageHandleCanvas from "../ImageHandleCanvas/ImageHandleCanvas";
import BlankCanvas from "../../assets/illustrations/blank_canvas.svg";

const CanvasHandle = () => {
  const canvas = useRef(null);
  const uploads = useSelector((state) => state.uploads);
  const [selectedForHandle, setSelectedForHandle] = useState(null);

  const getSelectedForHandleImage = () => {
    const selectedIndex = uploads.files.findIndex(
      (value) => value.selectedForHandle === true
    );

    if (selectedIndex >= 0) setSelectedForHandle(uploads.files[selectedIndex]);
  };

  useEffect(() => {
    getSelectedForHandleImage();
  }, [uploads]);

  return (
    <div className="canvas">
      <p className="canvas-header">Add Handle</p>
      {selectedForHandle ? (
        <div className="canvas-page">
          <ImageHandleCanvas
            image={selectedForHandle.croppedURL}
            setCanvas={(value) => (canvas.current = value)}
          />
        </div>
      ) : (
        <div className="canvas-illustration">
          <img alt="blank-canvas" src={BlankCanvas} />
          <p>No image selected! The canvas is blank.</p>
        </div>
      )}
    </div>
  );
};

export default CanvasHandle;
