// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../redux-setup/apiSlice";
// import TestSlice from "../redux-setup/TestSlice";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
// const reducers = {
//   TestSlice,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// };
// const persistedReducer = persistReducer(persistConfig, reducers);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(
//       apiSlice.middleware
//     ),
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux-setup/apiSlice";
import TestSlice from "../redux-setup/TestSlice";
export const store = configureStore({
  reducer: {
    TestSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
