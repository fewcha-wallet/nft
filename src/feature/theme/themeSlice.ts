import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeTheme {
  theme: "light" | "dark";
  loading?: boolean;
}
const initialState: TypeTheme = {
  theme: "light",
  loading: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<TypeTheme>) {
      state.loading = true;
      state.theme = action.payload.theme;
      state.loading = false;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

// export const selectTheme = (state: RootState) => state.theme;
const themeReducer = themeSlice.reducer;
export default themeReducer;
