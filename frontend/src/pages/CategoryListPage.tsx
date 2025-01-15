import React from 'react';
import { Link } from 'react-router-dom';

const CategoryListPage: React.FC = () => {
    return (
        <div>
            <h1>Category List</h1>
            <Link to="/create-category">Create New Category</Link>
            {}
        </div>
    );
};

export default CategoryListPage;
