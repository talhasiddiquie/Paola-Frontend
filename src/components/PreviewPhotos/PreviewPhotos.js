import React, { useEffect, useRef, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import IphoneMockup from "../IphoneMockup/IphoneMockup";
import { List, AutoSizer, CellMeasurerCache } from "react-virtualized";
import DragableImage from "../DragableImage/DragableImage";
import {
  getSelectedFiles,
  imageFocused,
  uploadsSorted,
} from "../../store/uploads";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const PreviewPhotoPanel = () => {
  const dispatch = useDispatch();
  const uploads = useSelector((state) => state.uploads);
  const [croppedImages, setCroppedImages] = useState([]);

  const onSelectImage = (imageId) => dispatch(imageFocused({ id: imageId }));

  const onRearrangeImages = (newIndex, oldIndex) =>
    dispatch(uploadsSorted({ oldIndex, newIndex }));

  useEffect(() => {
    setCroppedImages(uploads.files.filter((value) => value.croppedURL));
  }, [uploads]);

  return (
    <div className="control-panel">
      <div className="gallery-control">
        <IphoneMockup>
          <div className="device-header">
            <ArrowBackIosIcon />
            <p>Header</p>
            <MoreHorizIcon />
          </div>
          <div className="device-body">
            <AutoSizer>
              {({ width, height }) => {
                console.log(croppedImages);
                const itemsPerRow = 3;
                const rowCount = Math.ceil(croppedImages.length / 3);

                return (
                  <List
                    width={width}
                    height={height}
                    rowHeight={72}
                    // rowHeight={cache.current.rowHeight}
                    // deferredMeasurementCache={cache.current}
                    rowCount={rowCount}
                    rowRenderer={({ key, index, style, parent }) => {
                      const items = [];
                      const fromIndex = index * itemsPerRow;
                      const toIndex = Math.min(
                        fromIndex + 3,
                        croppedImages.length
                      );

                      for (let i = fromIndex; i < toIndex; i++) {
                        if (croppedImages[i].croppedURL)
                          items.push(
                            <DragableImage
                              key={i}
                              dropable={true}
                              index={croppedImages[i].id}
                              src={croppedImages[i].croppedURL}
                              onRearrangeImages={onRearrangeImages}
                              alt={`cropped ${croppedImages[i].id}`}
                              onSelect={() =>
                                onSelectImage(croppedImages[i].id)
                              }
                            />
                          );
                      }
                      return <div style={style}>{items}</div>;
                    }}
                  />
                );
              }}
            </AutoSizer>
          </div>
          <div className="device-footer">
            <HomeIcon />
            <SearchIcon />
            <ControlPointIcon />
            <FavoriteBorderIcon />
            <AccountCircleIcon />
          </div>
        </IphoneMockup>
      </div>
    </div>
  );
};

export default PreviewPhotoPanel;
