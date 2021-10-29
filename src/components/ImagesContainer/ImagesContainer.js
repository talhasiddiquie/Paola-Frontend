import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragableImage from "../DragableImage/DragableImage";
import {
  getSelectedFiles,
  singleUploadDropped,
  uploadsDropped,
} from "../../store/uploads";

const ImagesContainer = (props) => {
  const { header, type, images, selectedType, onSelectImage } = props;

  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);

  const onSingleImageDrop = (item) =>
    dispatch(singleUploadDropped({ id: item.id }));

  const onMultipleImagesDrop = () => dispatch(uploadsDropped());

  const renderDragableImages = () => {
    if (type === "cropped" && images)
      return images.map((value, index) => {
        if (value.croppedURL && !value.duplicate)
          return (
            <DragableImage
              key={index}
              index={index}
              dropable={false}
              selected={value[selectedType]}
              onSelect={() => onSelectImage(value.id)}
              src={type === "cropped" ? value.croppedURL : value.url}
            />
          );
        return null;
      });

    if (type === "original" && images)
      return images.map((value, index) => {
        if (!value.duplicate)
          return (
            <DragableImage
              key={index}
              index={index}
              dropable={false}
              selected={value[selectedType]}
              items={getSelectedFiles(uploads)}
              onDropSingleImage={onSingleImageDrop}
              onSelect={() => onSelectImage(value.id)}
              onDropMultipleImages={onMultipleImagesDrop}
              src={type === "cropped" ? value.croppedURL : value.url}
            />
          );
      });
  };

  return (
    <div className="uploaded-images">
      <p>{header}</p>
      <div className="uploaded-image-container">{renderDragableImages()}</div>
    </div>
  );
};

export default React.memo(ImagesContainer);
