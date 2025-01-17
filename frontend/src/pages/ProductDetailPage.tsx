import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation } from '../services/categoryApi';
import { Card, Button, message } from 'antd';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: products } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const product = products?.find((p) => p.id === Number(id));

    const handleDelete = async () => {
        if (id) {
            try {
                await deleteProduct(Number(id)).unwrap();
                message.success('Product deleted successfully');
                navigate('/categories');
            } catch (error) {
                message.error('Failed to delete the product');
            }
        }
    };

    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <Card
                title={product.name}
                cover={<img alt={product.name} src={product.image_url} />}
            >
                <p><b>Price:</b> ${product.price}</p>
                <p><b>Description:</b> {product.description}</p>
                <Button type="primary" danger onClick={handleDelete}>
                    Delete Product
                </Button>
            </Card>
        </div>
    );
};

export default ProductDetailPage;
