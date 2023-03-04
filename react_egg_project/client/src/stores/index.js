import { configureStore } from "@reduxjs/toolkit";
import { houseReducer } from "./modules/house";
import { userReducer } from "./modules/user";

export const store = configureStore({
  reducer: {
    house: houseReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
