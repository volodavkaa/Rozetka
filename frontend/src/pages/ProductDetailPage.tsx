import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation } from '../services/categoryApi';
import { Card, Button, message, Row, Col } from 'antd';

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
        <div style={{ padding: '20px' }}>
            <Row justify="center" gutter={[16, 16]}>
                <Col xs={24} sm={16} md={12} lg={8}>
                    <Card
                        cover={
                            <img
                                alt={product.name}
                                src={product.image_url}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                }}
                            />
                        }
                    >
                        <Card.Meta
                            title={<h2>{product.name}</h2>}
                            description={
                                <>
                                    <p><b>Price:</b> ${product.price}</p>
                                    <p><b>Description:</b> {product.description}</p>
                                </>
                            }
                        />
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Button
                                type="primary"
                                danger
                                onClick={handleDelete}
                                style={{ width: '100%' }}
                            >
                                Delete Product
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetailPage;
