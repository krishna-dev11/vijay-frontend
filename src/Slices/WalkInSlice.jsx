import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walkIns: [],
  loading: false,
};

const WalkInSlice = createSlice({
  name: "walkIn",
  initialState,
  reducers: {
    setWalkIns(state, action) {
      state.walkIns = action.payload;
    },
    setWalkInLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setWalkIns, setWalkInLoading } = WalkInSlice.actions;
export default WalkInSlice.reducer;
