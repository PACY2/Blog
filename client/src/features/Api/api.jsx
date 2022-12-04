import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");

    if (localStorage.getItem("token")) {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }

    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
