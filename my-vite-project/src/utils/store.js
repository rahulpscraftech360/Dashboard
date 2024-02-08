// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import organizationSlice from "./organizationSlice";

const reducers = combineReducers({
  // Add slices here

  organizationSlice: organizationSlice,
});

const persistConfig = {
  key: "root",
  storage,
  // you can specify other config for redux-persist here, such as a list of reducers to blacklist or whitelist
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // additional middleware can be added here
});
