import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryListPage from './pages/CategoryListPage';
import CreateCategoryPage from './pages/CreateCategoryPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoryListPage />} />
            <Route path="/create-category" element={<CreateCategoryPage />} />
        </Routes>
    );
};

export default App;
