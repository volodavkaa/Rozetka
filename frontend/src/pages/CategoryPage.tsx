import React from 'react';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '../services/categoryApi';
import CategoryTree from '../components/CategoryTree';

const CategoryPage: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = async (id: number) => {
    try {
        await deleteCategory(id);
        console.log(`Category with ID ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
    }
};


  return (
    <div>
      <h1>Categories and Products</h1>
      {categories && (
        <CategoryTree
          categories={categories}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoryPage;
