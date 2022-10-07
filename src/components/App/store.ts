import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "feature/theme/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
export default store;
