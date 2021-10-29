import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImageHandleCanvas = (props) => {
  const canvasRef = useRef(null);
  const { image, setCanvas } = props;
  const [canvasImage, setCanvasImage] = useState(null);
  const handleControls = useSelector((state) => state.handleControls);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    console.log(img.width, img.height);
    setCanvasImage(img);
  }, [image]);

  useEffect(() => {
    drawHandleOverImage();
    setCanvas(canvasRef.current);
  }, [canvasImage]);

  useEffect(() => {
    drawHandleOverImage();
  }, [handleControls]);

  const drawHandleOverImage = () => {
    if (canvasImage) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = handleControls.color ? handleControls.color : "black";
      context.font = `${handleControls.fontSize}px Arial`;
      context.textAlign = "center";
      context.drawImage(canvasImage, 0, 0);
      context.fillText(
        handleControls.handle,
        canvas.width / 2,
        canvas.height / 1.1
      );
    }
  };

  return (
    <>
      <canvas
        id="myCanvas"
        ref={canvasRef}
        className="image-handle-canvas"
        width={canvasImage ? canvasImage.width : 200}
        height={canvasImage ? canvasImage.height : 200}
      />
    </>
  );
};

export default ImageHandleCanvas;
