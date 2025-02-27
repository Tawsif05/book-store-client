import { TResponseRedux } from "../../../types/response.type";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((val) => params.append(key, val));
            } else if (value) {
              params.append(key, value as string);
            }
          });
        }

        return {
          url: "/books",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Book"],
      transformResponse: (response: TResponseRedux) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/books/${productId}`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    createBook: builder.mutation({
      query: (formData) => ({
        url: "/books",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = productApi;
