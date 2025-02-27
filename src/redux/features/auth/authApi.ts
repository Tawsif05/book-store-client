import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"], 
    }),
    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "POST",  
        body: passwordData,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/all-users",
        method: "GET",
      }),
      providesTags: ["User"], 
    }),
    changeStatus: builder.mutation({
      query: ({userId, status}) => ({
        url: `/auth/change-status/${userId}`,
        method: "POST",
        body: {status}  
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation, useGetAllUsersQuery,useChangeStatusMutation } = authApi;
