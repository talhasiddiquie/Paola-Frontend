import { Button } from "@material-ui/core";
import React from "react";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import AppsIcon from "@material-ui/icons/Apps";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";

const PhotoSplit = () => {
  return (
    <div className="control-panel">
      <ImagesContainer />
      <div className="split-btn-container">
        {/* <Button fullWidth variant="contained" startIcon={<AppsIcon />}>
          Split
        </Button> */}
      </div>

      <ControlPanelTip tip="Tip: Select an image to crop it into 9" />
    </div>
  );
};

export default PhotoSplit;
