import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ColorizeIcon from "@material-ui/icons/Colorize";
import { ChromePicker, GithubPicker } from "react-color";
import ControlPanelTip from "../ControlPanelTip/ControlPanelTip";
import { useDispatch, useSelector } from "react-redux";
import {
  colorChanged,
  fontSizeChanged,
  handleChanged,
} from "../../store/handleControls";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import {
  handleAddedOverAllImages,
  handleAddedOverImage,
  imageSelectedForHandlePreview,
} from "../../store/uploads";

const AddHandle = () => {
  const dispatch = useDispatch();
  const [picker, setPicker] = useState(false);
  const uploads = useSelector((state) => state.uploads);
  const handleControls = useSelector((state) => state.handleControls);

  const onSelectImage = (id) => dispatch(imageSelectedForHandlePreview({ id }));

  const onAddHandleOnImage = () =>
    dispatch(
      handleAddedOverImage({
        handleColor: handleControls.color,
        handle: handleControls.handle,
        fontSize: handleControls.fontSize,
      })
    );

  const onAddHandleOnAllImages = () =>
    dispatch(
      handleAddedOverAllImages({
        handleColor: handleControls.color,
        handle: handleControls.handle,
        fontSize: handleControls.fontSize,
      })
    );

  return (
    <div className="control-panel">
      <div className="handle-control">
        <ImagesContainer
          type="cropped"
          header="Available Images"
          images={uploads.files}
          onSelectImage={onSelectImage}
          selectedType="selectedForHandle"
        />

        <div className="crop-controls-buttons">
          <Button variant="contained" onClick={onAddHandleOnImage}>
            Add handle to image
          </Button>
          <Button variant="contained" onClick={onAddHandleOnAllImages}>
            Add handle to all images
          </Button>
        </div>

        <p className="handle-control-label">Handle</p>

        <div>
          <input
            name="handle"
            placeholder="@YourHanlde"
            value={handleControls.handle}
            onChange={(event) => dispatch(handleChanged(event.target.value))}
          />

          <input
            name="font"
            type="number"
            placeholder="font size"
            value={handleControls.fontSize}
            onChange={(event) => dispatch(fontSizeChanged(event.target.value))}
          />
        </div>
        <br />
        <hr />

        <div className="handle-control-colors">
          <GithubPicker
            width={300}
            onChangeComplete={(color, event) =>
              dispatch(colorChanged(color.hex))
            }
          />
          <div
            style={picker ? { display: "block" } : {}}
            className="handle-control-picker"
          >
            <ChromePicker
              color={handleControls.color}
              onChange={(color, event) => dispatch(colorChanged(color.hex))}
            />
          </div>
          <Button
            onClick={() => setPicker(!picker)}
            fullWidth
            variant="contained"
            startIcon={<ColorizeIcon />}
          >
            {picker ? `Hide` : "Show"} Color Picker
          </Button>
        </div>
      </div>

      <ControlPanelTip tip="Tip: Write your handle in the text field and select text color." />
    </div>
  );
};

export default AddHandle;
