import { combineReducers } from "@reduxjs/toolkit";
import userAuthenticationReducer from "./session";
import listStorageReducer from "./list-storage";

export const rootReducer = combineReducers({
  userAuth: userAuthenticationReducer,
  listStorage: listStorageReducer,
});
