
import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full px-4">
          <h1 className="text-2xl font-bold text-center mb-8">Create Your WealthCompass Account</h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
