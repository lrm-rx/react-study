import { configureStore } from "@reduxjs/toolkit";
import { houseReducer } from "./modules/house";

export const store = configureStore({
  reducer: {
    house: houseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
