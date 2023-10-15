import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base = "https://www.example.com/";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: base,
    // prepareHeaders: (headers) => {
    //   const token = getState().token;
    //   if (token) {
    //     headers.set("authorization", token);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `endpoint`,
    }),
    GetDatabyparams: builder.query({
      query: (arg) => {
        return {
          url: "endpoint",
          params: arg,
        };
      },
    }),
    postData: builder.mutation({
      query: (data) => ({
        url: `endpoint`,
        method: "POST",
        body: data,
      }),
    }),
    deleteData: builder.mutation({
      query: (data) => ({
        url: `endpoint`,
        method: "DELETE",
        body: data,
      }),
    }),
    updateData: builder.mutation({
      query: (data) => ({
        url: `endpoint`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetDataQuery,
  useLazyGetDatabyparamsQuery,
  usePostDataMutation,
  useDeleteDataMutation,
  useUpdateDataMutation,
} = apiSlice;
