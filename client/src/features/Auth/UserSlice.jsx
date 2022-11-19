import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/api";
import { info_notif, success_notif } from "../../components/Notifications";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "/login",
        data,
        method: "post",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "/register",
        data,
        method: "post",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "/logout",
        method: "post",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const fetch_profile = createAsyncThunk(
  "user/fetch_profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "/profile",
        method: "get",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const verify_email = createAsyncThunk(
  "user/verify_email",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: location.pathname + location.search,
        method: "get",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      login_status: null,
      register_status: null,
      logout_status: null,
      email_verified_at_status: "loading",
      status: "loading",
      user: null,
      token: null,
      errors: null,
    },
  },
  reducers: {
    set_status: (state, { payload }) => {
      state.value.status = payload;
    },
    set_email_verified_at_status: (state, { payload }) => {
      state.value.email_verified_at_status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.value.login_status = "loading";
      state.value.errors = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.value.errors = null;
      state.value.login_status = "success";
      state.value.user = action.payload.user;
      state.value.status = "success";
      state.value.token = action.payload.token;
      state.value.user.role = action.payload.user.role.name;
      localStorage.setItem("token", action.payload.token);
      success_notif("Welcome back");
      if (!action.payload.user.email_verified_at) {
        info_notif("Make sure to verify your Email Address");
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.value.login_status = "failed";
      state.value.errors = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.value.errors = null;
      state.value.register_status = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.value.errors = null;
      state.value.register_status = "success";
      state.value.user = action.payload.user;
      state.value.token = action.payload.token;
      state.value.user.role = action.payload.user.role.name;
      localStorage.setItem("token", action.payload.token);
      success_notif("Welcome");
      if (!action.payload.user.email_verified_at) {
        info_notif("Make sure to verify your Email Address");
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.value.register_status = "failed";
      state.value.errors = action.payload;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.value.logout_status = "loading";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.value.errors = null;
      state.value.logout_status = "success";
      state.value.user = null;
      state.value.token = null;
      state.value.status = "rejected";
      localStorage.removeItem("token");
      success_notif("Good bye");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.value.logout_status = "failed";
    });
    builder.addCase(fetch_profile.pending, (state, action) => {
      state.value.status = "loading";
    });
    builder.addCase(fetch_profile.fulfilled, (state, action) => {
      state.value.errors = null;
      state.value.status = "success";
      state.value.user = action.payload;
      state.value.user.role = action.payload.role.name;
      state.value.token = localStorage.getItem("token");
    });
    builder.addCase(fetch_profile.rejected, (state, action) => {
      state.value.status = "failed";
      localStorage.removeItem("token");
    });
    builder.addCase(verify_email.pending, (state, action) => {
      state.value.email_verified_at_status = "loading";
    });
    builder.addCase(verify_email.fulfilled, (state, action) => {
      state.value.email_verified_at_status = "success";
    });
    builder.addCase(verify_email.rejected, (state, action) => {
      state.value.email_verified_at_status = "failed";
    });
  },
});

export const fetch_user_state = (state) => state.user.value;
export const { set_status, set_email_verified_at_status } = UserSlice.actions;
export default UserSlice.reducer;
