
import React from 'react';
import Layout from '@/components/layout/Layout';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import AssetTable from '@/components/dashboard/AssetTable';
import RiskAnalysis from '@/components/dashboard/RiskAnalysis';

const DashboardPage = () => {
  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>
        
        <PortfolioSummary />
        <PerformanceChart />
        <RiskAnalysis />
        <AssetTable />
      </div>
    </Layout>
  );
};

export default DashboardPage;
