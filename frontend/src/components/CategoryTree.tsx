import React from 'react';
import { List, Button, Collapse, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Category } from '../services/categoryApi';

const { Meta } = Card;

interface CategoryTreeProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onDelete }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    return (
        <List
            dataSource={categories}
            renderItem={(category) => (
                <List.Item>
                    <div style={{ width: '100%' }}>
                        <Collapse
                            items={[
                                {
                                    key: category.id.toString(),
                                    label: (
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
                                    ),
                                    children: (
                                        <>
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
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </List.Item>
            )}
        />
    );
};

export default CategoryTree;