import { RootState } from "./../../components/App/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfoFewcha {
  address: string;
  balance?: number | null;
  isConnected: boolean;
  name?:string;
}

const initialState: InfoFewcha = {
  name:"fewcha",
  address: "",
  balance: null,
  isConnected: false,
};

export const fewchaSlice = createSlice({
  name: "fewcha",
  initialState,
  reducers: {
    updateInfoFewchaWallet(state, action: PayloadAction<InfoFewcha>) {
      console.log("action: ",action);
      state.isConnected = action.payload.isConnected;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
  },
});

export const { updateInfoFewchaWallet } = fewchaSlice.actions;

export const selectInfoFewcha = (state: RootState) => state.fewcha;

const fewchaReducer = fewchaSlice.reducer;
export default fewchaReducer;
