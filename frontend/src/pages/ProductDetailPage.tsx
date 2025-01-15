import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/categoryApi';
import { Card, Row, Col, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: products, isLoading } = useGetProductsQuery();

    if (isLoading) return <p>Loading product details...</p>;

    const product = products?.find((product) => product.id === parseInt(id || ''));

    if (!product) return <p>Product not found</p>;

    return (
        <Row justify="center" style={{ padding: '20px' }}>
            <Col xs={24} sm={20} md={16} lg={12}>
                <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image_url} style={{ maxHeight: '400px', objectFit: 'cover' }} />}
                >
                    <Title level={3}>{product.name}</Title>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text strong>Price:</Text> <Text type="success">${product.price}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Description:</Text>
                            <p>{product.description}</p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default ProductDetailPage;