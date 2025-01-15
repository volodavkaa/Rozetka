import React, { useState } from 'react';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../services/categoryApi';

const CreateSubcategoryPage: React.FC = () => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<number | null>(null);
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (parentId) {
            await createCategory({ name, parent: parentId });
            setName('');
            setParentId(null);
        }
    };

    if (isLoading) return <p>Loading categories...</p>;

    return (
        <div>
            <h1>Create Subcategory</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Subcategory Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Parent Category:
                    <select
                        value={parentId || ''}
                        onChange={(e) => setParentId(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            Select Parent Category
                        </option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Create Subcategory</button>
            </form>
        </div>
    );
};

export default CreateSubcategoryPage;
