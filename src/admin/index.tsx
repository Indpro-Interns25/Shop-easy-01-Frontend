import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminDashboard from './adminndash';
import ProductManagement from './productmanagement';
import UserManagement from './usermanagement';
import SellerManagement from './sellermanagement';
import WebsiteAnalysis from './websiteanalysis';

const Admin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <ProductManagement />;
      case 'users':
        return <UserManagement />;
      case 'sellers':
        return <SellerManagement />;
      case 'analytics':
        return <WebsiteAnalysis />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;