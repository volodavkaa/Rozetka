import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: number;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products/',
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: 'products/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
