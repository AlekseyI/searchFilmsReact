import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmReducer";

const rootReducer = combineReducers({
  film: filmReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
