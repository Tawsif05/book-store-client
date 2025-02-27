import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getOrdersByUser: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",  
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET"
      }),
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetOrdersByUserQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery
} = orderApi;
