import { RootState } from "./../../components/App/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BalanceType } from "./../../components/App/type";
import { NameWallet } from "components/App/type";

interface WalletType {
  name: NameWallet;
  isConnected: boolean;
  address: string;
  balance?: BalanceType;
}

const initialState: WalletType = {
  name: "",
  isConnected: false,
  address: "",
};

export const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWallet(state, action: PayloadAction<WalletType>) {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.isConnected = action.payload.isConnected;
    },
  },
});
export const { updateWallet } = WalletSlice.actions;
export const selectWallet = (state: RootState) => state.wallet;
export const selectNameWallet = (state: RootState) => state.wallet.name;

const walletReducer = WalletSlice.reducer;
export default walletReducer;
