
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPortfolio, assetTypeColors } from '@/data/mockData';

const PortfolioSummary = () => {
  const { user } = useAuth();
  const portfolio = user ? getUserPortfolio(user.username) : null;
  
  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No portfolio data available</p>
        </CardContent>
      </Card>
    );
  }
  
  const allocationData = Object.entries(portfolio.assetAllocation).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
    value: Number(value),
    type: key
  }));
  
  const COLORS = Object.values(assetTypeColors);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const calculatePerformance = () => {
    const initialValue = portfolio.initialInvestment;
    const currentValue = portfolio.totalValue;
    const performanceValue = currentValue - initialValue;
    const performancePercent = (performanceValue / initialValue) * 100;
    
    return {
      value: performanceValue,
      percent: performancePercent,
      isPositive: performanceValue >= 0
    };
  };
  
  const performance = calculatePerformance();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold">{formatCurrency(portfolio.totalValue)}</p>
              <div className={`flex items-center mt-1 ${performance.isPositive ? 'text-wealth-success' : 'text-wealth-danger'}`}>
                <span className="text-sm font-medium">
                  {performance.isPositive ? '+' : ''}{formatCurrency(performance.value)} ({performance.percent.toFixed(2)}%)
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial Investment</span>
                <span>{formatCurrency(portfolio.initialInvestment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(portfolio.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(portfolio.lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Score</span>
                <span className="font-semibold">{portfolio.riskScore}/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Allocation']} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
