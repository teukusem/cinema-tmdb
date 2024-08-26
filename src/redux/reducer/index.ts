import { combineReducers } from "@reduxjs/toolkit";
import userAuthenticationReducer from "./session";

export const rootReducer = combineReducers({
  userAuth: userAuthenticationReducer,
});
