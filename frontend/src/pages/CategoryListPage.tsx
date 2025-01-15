import React from 'react';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../services/categoryApi';

const CategoryListPage: React.FC = () => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories?.map((category) => (
                    <li key={category.id}>
                        {category.name}{' '}
                        <button onClick={() => deleteCategory(category.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryListPage;
