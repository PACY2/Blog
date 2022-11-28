import { createSlice } from "@reduxjs/toolkit";
import { info_notif } from "../../components/Notifications";

const initialState = {
  value: {
    user: null,
    token: null,
    connected: false,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_auth: (state, { payload }) => {
      state.value.user = payload.user;
      if (localStorage.getItem("token")) {
        state.value.token = localStorage.getItem;
      }
      state.value.token = payload.token;
      state.value.connected = true;
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }
    },
    set_auth_field: (state, { payload }) => {
      console.log(payload);
      state.value.user[payload[0]] = payload[1];
    },
    reset_auth: (state) => {
      state.value.user = null;
      state.value.token = null;
      state.value.connected = false;
      localStorage.removeItem("token");
      info_notif("Your are now logged out");
    },
  },
});

export const [
  select_auth_connected,
  select_auth,
  select_auth_user,
  select_auth_token,
] = [
  (state) => state.user.value.connected,
  (state) => state.user.value,
  (state) => state.user.value.user,
  (state) => state.user.value.token,
];

export const { set_auth, reset_auth, set_auth_field } = UserSlice.actions;
export default UserSlice.reducer;
