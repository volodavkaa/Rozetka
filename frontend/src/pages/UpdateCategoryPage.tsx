import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateCategoryMutation } from '../services/categoryApi';

const UpdateCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateCategory({ id: parseInt(id, 10), body: { name } });
    }
  };

  return (
    <div>
      <h1>Update Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCategoryPage;
