import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";

// const configureAppStore = () => {
//   const store =
//   return store;
// };

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()],
});
