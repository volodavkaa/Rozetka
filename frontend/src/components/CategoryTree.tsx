import React, { useState } from 'react';
import { Category } from '../services/categoryApi';

interface CategoryTreeProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onDelete }) => {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const toggleCategory = (id: number) => {
        setExpandedCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id}>
                    <div>
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => toggleCategory(category.id)}
                        >
                            {category.name}
                        </span>
                        <button onClick={() => onDelete(category.id)}>Delete</button>
                    </div>
                    {expandedCategories.includes(category.id) && (
                        <div style={{ marginLeft: '20px' }}>
                            {category.products?.length > 0 && (
                                <ul>
                                    <li>
                                        <strong>Products:</strong>
                                    </li>
                                    {category.products.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            )}
                            {category.subcategories?.length > 0 && (
                                <ul>
                                    <li>
                                        <strong>Subcategories:</strong>
                                    </li>
                                    {category.subcategories.map((subcategory) => (
                                        <CategoryTree
                                            key={subcategory.id}
                                            categories={[subcategory]}
                                            onDelete={onDelete}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CategoryTree;
