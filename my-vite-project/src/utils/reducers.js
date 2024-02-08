import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import dataSlice from "./dataSlice";
import organizationSlice from "./organizationSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["organization"], // Only persist the "organization" slice
};

const appPersistConfig = {
  key: "app",
  storage,
  // Don't persist anything for the "app" slice
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appSlice),
  search: searchSlice,
  data: dataSlice,
  organization: persistReducer(persistConfig, organizationSlice),
});

export default rootReducer;
