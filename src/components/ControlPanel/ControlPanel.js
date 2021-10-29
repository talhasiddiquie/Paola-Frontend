import React from "react";
import AddHandle from "../AddHandle/AddHandle";
import UploadPhotoPanel from "../UploadPhoto/UploadPhoto";
import PreviewPhotoPanel from "../PreviewPhotos/PreviewPhotos";
import PhotoSplitPanel from "../PhotoSplitPanel/PhotoSplitPanel";

const Panel = (props) => {
  const { active } = props;

  const displayPanel = () => {
    switch (active) {
      case 0:
        return <UploadPhotoPanel />;
      case 1:
        return <AddHandle />;
      case 2:
        return <PhotoSplitPanel />;
      case 3:
        return <PreviewPhotoPanel />;
      default:
        break;
    }
  };

  return <>{displayPanel()}</>;
};

export default Panel;
