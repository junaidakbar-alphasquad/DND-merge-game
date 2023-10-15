const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  temp: "temp",
  items: [],
};

const TestSlice = createSlice({
  name: "TestSlice",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    showConsole: (state, action) => {
      state.temp = action.payload;
    },
  },
});
export const { setItems } = TestSlice.actions;
export default TestSlice.reducer;
