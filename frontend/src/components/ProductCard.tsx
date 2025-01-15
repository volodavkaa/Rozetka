import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image_url }) => {
    return (
        <Card
            hoverable
            style={{ width: 240, margin: '10px' }}
            cover={
                <img 
                    alt={name} 
                    src={image_url || 'https://via.placeholder.com/240x150'} 
                    style={{ height: '150px', objectFit: 'cover' }}
                />
            }
        >
            <Meta title={name} description={`Price: $${price}`} />
            <p style={{ marginTop: '10px' }}>{description}</p>
        </Card>
    );
};

export default ProductCard;
