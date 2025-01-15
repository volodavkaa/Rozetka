import React, { useState } from 'react';
import { useCreateProductMutation, useGetCategoriesQuery } from '../services/categoryApi';

const CreateProductPage: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [image_url, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryId && price) {
            await createProduct({
                name,
                description,
                price: Number(price),
                image_url,
                category: categoryId,
            });

            
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');
            setCategoryId(null);
        }
    };

    if (isLoading) return <p>Loading categories...</p>;

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.valueAsNumber || '')}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={image_url}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <label>
                    Category:
                    <select
                        value={categoryId || ''}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories?.map((category) => (
                            <optgroup key={category.id} label={category.name}>
                                <option value={category.id}>{category.name}</option>
                                {category.subcategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {`-- ${sub.name}`}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;
