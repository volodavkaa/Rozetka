import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: number;
    image_url: string;
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
    tagTypes: ['Category', 'Product'],
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
            invalidatesTags: ['Category', 'Product'], 
        }),
        deleteProduct: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `products/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} = categoryApi;
