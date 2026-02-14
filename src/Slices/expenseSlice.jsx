import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  expenseData: null,   // <-- IMPORTANT
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setExpenseData(state, action) {
      state.expenseData = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setExpenseData, setError } = expenseSlice.actions;
export default expenseSlice.reducer;
