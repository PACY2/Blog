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
      query: () => window.location.pathname + window.location.search,
    }),
    getProfile: builder.query({
      query: () => "/profile",
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
} = authApi;
