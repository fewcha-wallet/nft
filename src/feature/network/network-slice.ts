import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NETWORK {
  name: string | null;
  url: string;
}
const initialState: NETWORK = {
  name: "",
  url: "",
};
const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    updateNetwork(state, action: PayloadAction<NETWORK>) {
      state.name = action.payload.name;
      state.url = action.payload.url;
    },

    reset(state) {
      state.name = null;
      state.url = "";
    },
  },
});
export const { updateNetwork, reset } = networkSlice.actions;
const networkReducer = networkSlice.reducer;
export default networkReducer;
