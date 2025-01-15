import React, { useState } from 'react';
import { List, Button, Collapse, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Category } from '../services/categoryApi';

const { Panel } = Collapse;
const { Meta } = Card;

interface CategoryTreeProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onDelete }) => {
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
    const navigate = useNavigate();

    const toggleCategory = (id: number) => {
        setExpandedCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    const handleProductClick = (productId: number) => {
        navigate(`/products/${productId}`); // Перехід на сторінку деталей продукту
    };

    return (
        <List
            dataSource={categories}
            renderItem={(category) => (
                <List.Item>
                    <div style={{ width: '100%' }}>
                        <Collapse>
                            <Panel
                                header={
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{category.name}</span>
                                        <Button 
                                            type="primary" 
                                            danger 
                                            onClick={() => onDelete(category.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                }
                                key={category.id}
                            >
                                <div>
                                    {category.products.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                            {category.products.map((product) => (
                                                <Card
                                                    key={product.id}
                                                    hoverable
                                                    style={{ width: 240 }}
                                                    cover={<img alt={product.name} src={product.image_url} />}
                                                    onClick={() => handleProductClick(product.id)}
                                                >
                                                    <Meta 
                                                        title={product.name} 
                                                        description={`$${product.price}`} 
                                                    />
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                    {category.subcategories.length > 0 && (
                                        <CategoryTree
                                            categories={category.subcategories}
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default CategoryTree;
