import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { userReducer } from "./modules/userSlice";
import { articleReducer } from "./modules/articleSlice";
import { tagsReducer } from "./modules/tagsSlice";
import { categoryReducer } from "./modules/categorySlice";
import { globalReducer } from "./modules/globalSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  // whiteList: ["userInfo"],
  blacklist: [
    "articleInfo",
    "userInfo",
    "TagsInfo",
    "categoryInfo",
    "globalInfo",
  ],
  stateReconciler: autoMergeLevel2,
};

const userInfoPersistConfig = {
  key: "userInfo",
  storage,
  blacklist: ["basicInfo"],
};

const rootReducer = combineReducers({
  userInfo: persistReducer(userInfoPersistConfig, userReducer),
  articleInfo: articleReducer,
  TagsInfo: tagsReducer,
  categoryInfo: categoryReducer,
  globalInfo: globalReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  version: 1,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
