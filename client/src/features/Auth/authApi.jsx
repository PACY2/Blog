import { useParams } from "react-router-dom";
import { api } from "../Api/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation({
      query: () => window.location.pathname + (window.location.search ?? ""),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetPasswordToken: builder.query({
      query: () => ({
        url: window.location.pathname + (window.location.search ?? ""),
      }),
    }),
    updateResetedPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/profile",
    }),
    getProfileById: builder.query({
      query: ({ id }) => `/users/${id}`,
    }),
    patchProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useForgetPasswordMutation,
  useVerifyResetPasswordTokenQuery,
  useUpdateResetedPasswordMutation,
  usePatchProfileMutation,
  useGetProfileByIdQuery,
} = authApi;
