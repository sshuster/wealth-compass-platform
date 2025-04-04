
import React from 'react';
import Layout from '@/components/layout/Layout';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage = () => {
  return (
    <Layout requireAuth requireAdmin>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </Layout>
  );
};

export default AdminPage;
