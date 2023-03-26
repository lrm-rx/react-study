import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./modules/commonSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
  },
});
