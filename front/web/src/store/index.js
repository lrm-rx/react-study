import { configureStore } from "@reduxjs/toolkit";
import { commonReducer } from "./modules/commonSlice";

export const store = configureStore({
  reducer: {
    commons: commonReducer,
  },
});
