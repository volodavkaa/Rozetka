import React, { useState } from 'react';
import { List, Collapse, Card, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../services/categoryApi';
import { Category } from '../services/categoryApi';

const { Panel } = Collapse;
const { Meta } = Card;
const { confirm } = Modal;

interface CategoryTreeProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onDelete }) => {
    const navigate = useNavigate();
    const [deleteProduct] = useDeleteProductMutation();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); 

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleDeleteCategory = (id: number) => {
        confirm({
            title: 'Are you sure you want to delete this category?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => onDelete(id),
        });
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct(productId).unwrap();
            setSelectedCategory((prev) =>
                prev
                    ? {
                          ...prev,
                          products: prev.products.filter((p) => p.id !== productId),
                      }
                    : null
            );
        } catch (error) {
            console.error('Failed to delete the product');
        }
    };

    const handleProductClick = (productId: number) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {}
            <div style={{ width: '25%' }}>
                <List
                    dataSource={categories}
                    renderItem={(category) => (
                        <List.Item>
                            <div style={{ width: '100%' }}>
                                <Collapse>
                                    <Panel
                                        key={category.id.toString()}
                                        header={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span>{category.name}</span>
                                                <Tooltip title="Delete category">
                                                    <DeleteOutlined
                                                        style={{
                                                            color: 'red',
                                                            cursor: 'pointer',
                                                            fontSize: '16px',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteCategory(category.id);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </div>
                                        }
                                    >
                                        {}
                                        {category.subcategories.map((sub) => (
                                            <div
                                                key={sub.id}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '5px 10px',
                                                    backgroundColor:
                                                        selectedCategory?.id === sub.id
                                                            ? '#f0f0f0'
                                                            : 'transparent',
                                                }}
                                                onClick={() => handleCategoryClick(sub)}
                                            >
                                                {sub.name}
                                            </div>
                                        ))}
                                    </Panel>
                                </Collapse>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            {}
            <div style={{ width: '75%' }}>
                {selectedCategory ? (
                    selectedCategory.products.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {selectedCategory.products.map((product) => (
                                <Card
                                key={product.id}
                                hoverable
                                style={{ width: 240, overflow: 'hidden' }}
                                cover={
                                    <div style={{ width: '100%', height: 150, overflow: 'hidden' }}>
                                        <img
                                            alt={product.name}
                                            src={product.image_url || '/path/to/local/placeholder.jpg'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                }
                                onClick={() => handleProductClick(product.id)}
                            >
                                <Meta title={product.name} description={`$${product.price}`} />
                                <div style={{ marginTop: '10px' }}>
                                    <Tooltip title="Delete product">
                                        <DeleteOutlined
                                            style={{
                                                color: 'red',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProduct(product.id);
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </Card>
                            
                            ))}
                        </div>
                    ) : (
                        <p>No products available for this category</p>
                    )
                ) : (
                    <p>Select a category to view products</p>
                )}
            </div>
        </div>
    );
};

export default CategoryTree;
