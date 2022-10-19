import { RootState } from './../../components/App/store';
import { NetworkItem } from "./../../components/App/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NetworkItem = {
  type: "Testnet",
  label: "Aptos",
  url: "https://fullnode.devnet.aptoslabs.com",
};
const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    updateNetwork(state, action: PayloadAction<NetworkItem>) {
      state.type = action.payload.type;
      state.label = action.payload.label;
      state.url = action.payload.url;
    },

    reset(state) {
      state.type = "Testnet";
      state.label = "Aptos";
      state.url = "https://fullnode.devnet.aptoslabs.com";
    },
  },
});
export const { updateNetwork, reset } = networkSlice.actions;
export const selectNetwork = (state:RootState) => state.network;
const networkReducer = networkSlice.reducer;
export default networkReducer;
