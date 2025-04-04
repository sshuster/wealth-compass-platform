
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPortfolio } from '@/data/mockData';

const PerformanceChart = () => {
  const { user } = useAuth();
  const portfolio = user ? getUserPortfolio(user.username) : null;
  
  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No performance data available</p>
        </CardContent>
      </Card>
    );
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const data = portfolio.performanceData.map(item => ({
    date: formatDate(item.date),
    value: item.value
  }));
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={formatCurrency} 
                domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]} 
              />
              <Tooltip formatter={(value: number) => [formatCurrency(value), 'Value']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1E4D8C"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
