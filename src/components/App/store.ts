import { configureStore } from "@reduxjs/toolkit";
import networkReducer from "feature/network/network-slice";
import themeReducer from "feature/theme/themeSlice";
import walletReducer from "feature/wallet/wallet";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    wallet: walletReducer,
    network: networkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
