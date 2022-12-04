import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Auth/UserSlice";
import { api } from "./Api/api";

const store = configureStore({
  reducer: {
    user: UserSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export default store;
