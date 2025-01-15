import React, { useState } from 'react';

const CreateCategoryPage: React.FC = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Category created:', data);
                setName(''); 
            } else {
                console.error('Failed to create category');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create New Category</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Category Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCategoryPage;
