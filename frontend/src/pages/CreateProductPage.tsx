import React, { useState } from 'react';
import { useCreateProductMutation, useGetCategoriesQuery } from '../services/categoryApi';

const CreateProductPage: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryId && price) {
            const payload = { name, price: Number(price), category: categoryId };
            console.log("Payload to send:", payload); // Перевіряє, що ви надсилаєте правильні дані
            await createProduct(payload);
            setName('');
            setPrice('');
            setCategoryId(null);
        } else {
            console.error("Category ID or price is invalid:", { categoryId, price });
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
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.valueAsNumber || '')}
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
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProductPage;
