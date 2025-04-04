
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify that the user has admin privileges
    if (user) {
      if (user.role !== 'admin') {
        toast.error('You do not have permission to access the admin area');
        navigate('/dashboard');
      }
      setLoading(false);
    } else if (user === null) {
      // User is definitely not logged in
      toast.error('Please log in to access this page');
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wealth-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

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
