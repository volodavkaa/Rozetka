import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: number;
}

export interface Category {
    id: number;
    name: string;
    parent?: number;
    subcategories: Category[];
    products: Product[];
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
          query: () => 'categories/',
          providesTags: ['Category'],
        }),
        createCategory: builder.mutation<Category, Partial<Category>>({
          query: (body) => ({
            url: 'categories/',
            method: 'POST',
            body,
          }),
          invalidatesTags: ['Category'],
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
          query: (body) => ({
            url: 'products/',
            method: 'POST',
            body,
          }),
          invalidatesTags: ['Category'],
        }),
        // Додаємо нові ендпоінти:
        updateCategory: builder.mutation<Category, { id: number; body: Partial<Category> }>({
          query: ({ id, body }) => ({
            url: `categories/${id}/`,
            method: 'PUT',
            body,
          }),
          invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<{ success: boolean }, number>({
          query: (id) => ({
            url: `categories/${id}/`,
            method: 'DELETE',
          }),
          invalidatesTags: ['Category'],
        }),
      }),
      
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useCreateProductMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
  } = categoryApi;
  
