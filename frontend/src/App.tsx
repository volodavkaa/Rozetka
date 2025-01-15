import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import CategoryPage from './pages/CategoryPage';
import CreateCategoryPage from './pages/CreateCategoryPage';
import CreateSubcategoryPage from './pages/CreateSubcategoryPage';
import CreateProductPage from './pages/CreateProductPage';
import ProductDetailPage from './pages/ProductDetailPage'; 

const App: React.FC = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/categories" />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/create-category" element={<CreateCategoryPage />} />
                <Route path="/create-subcategory" element={<CreateSubcategoryPage />} />
                <Route path="/create-product" element={<CreateProductPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} /> {}
            </Routes>
        </AppLayout>
    );
};

export default App;
