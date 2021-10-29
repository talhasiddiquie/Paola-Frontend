import { combineReducers } from "redux";
import croppersReducer from "./croppers";
import uploadsReducer from "./uploads";
import croppedImagesReducer from "./croppedImages";
import handleControlsReducer from "./handleControls";
import UIReducer from "./UI";

export default combineReducers({
  UI: UIReducer,
  uploads: uploadsReducer,
  croppers: croppersReducer,
  croppedImages: croppedImagesReducer,
  handleControls: handleControlsReducer,
});
