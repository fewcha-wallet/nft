import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "feature/theme/themeSlice";
import fewchaReducer from "feature/wallet/fewchaSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    fewcha:fewchaReducer
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
