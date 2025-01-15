import React, { useState } from 'react';

const CreateCategoryPage: React.FC = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Category name:', name);
        // TODO: Надіслати дані на сервер
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
