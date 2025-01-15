import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const menuItems = [
        {
            key: '1',
            label: <Link to="/categories">Categories</Link>,
        },
        {
            key: '2',
            label: <Link to="/create-category">Create Category</Link>,
        },
        {
            key: '3',
            label: <Link to="/create-subcategory">Create Subcategory</Link>,
        },
        {
            key: '4',
            label: <Link to="/create-product">Create Product</Link>, // Додано пункт для створення продукту
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Menu theme="dark" mode="inline" items={menuItems} />
            </Sider>
            <Layout>
                <Layout.Content style={{ padding: '20px' }}>{children}</Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
