const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  items: [],
  cash: 0,
};

const TestSlice = createSlice({
  name: "TestSlice",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCash: (state, action) => {
      state.cash = action.payload;
    },
  },
});
export const { setItems, setCash } = TestSlice.actions;
export default TestSlice.reducer;
