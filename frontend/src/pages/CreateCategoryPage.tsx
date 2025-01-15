import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation } from '../services/categoryApi';

const CreateCategoryPage: React.FC = () => {
    const [name, setName] = useState('');
    const [createCategory] = useCreateCategoryMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createCategory({ name });
        navigate('/categories'); 
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
