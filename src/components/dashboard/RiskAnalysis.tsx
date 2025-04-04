
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPortfolio } from '@/data/mockData';
import { AlertTriangle, TrendingDown, AlertCircle, BarChart3 } from 'lucide-react';

const RiskAnalysis = () => {
  const { user } = useAuth();
  const portfolio = user ? getUserPortfolio(user.username) : null;
  
  if (!portfolio || !portfolio.riskAnalysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No risk analysis data available</p>
        </CardContent>
      </Card>
    );
  }
  
  const { volatility, sharpeRatio, drawdown, var: valueAtRisk } = portfolio.riskAnalysis;
  
  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };
  
  const getRiskLevel = (score: number) => {
    if (score <= 3) return 'Low';
    if (score <= 6) return 'Moderate';
    return 'High';
  };
  
  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-wealth-success';
    if (score <= 6) return 'text-wealth-warning';
    return 'text-wealth-danger';
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Portfolio Risk Score</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{portfolio.riskScore.toFixed(1)}</div>
                <div className={`text-sm font-medium ${getRiskColor(portfolio.riskScore)}`}>
                  {getRiskLevel(portfolio.riskScore)} Risk
                </div>
              </div>
              <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(portfolio.riskScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card border rounded-md">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 mr-2 text-wealth-primary" />
                  <span className="font-medium">Volatility</span>
                </div>
                <div className="text-2xl font-bold">{formatPercent(volatility)}</div>
                <p className="text-sm text-muted-foreground mt-1">Historical price fluctuation</p>
              </div>
              
              <div className="p-4 bg-card border rounded-md">
                <div className="flex items-center mb-2">
                  <TrendingDown className="h-5 w-5 mr-2 text-wealth-primary" />
                  <span className="font-medium">Max Drawdown</span>
                </div>
                <div className="text-2xl font-bold text-wealth-danger">{formatPercent(drawdown)}</div>
                <p className="text-sm text-muted-foreground mt-1">Largest historical decline</p>
              </div>
              
              <div className="p-4 bg-card border rounded-md">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 mr-2 text-wealth-primary" />
                  <span className="font-medium">Value at Risk</span>
                </div>
                <div className="text-2xl font-bold text-wealth-danger">{formatPercent(valueAtRisk)}</div>
                <p className="text-sm text-muted-foreground mt-1">Daily VaR (95% confidence)</p>
              </div>
              
              <div className="p-4 bg-card border rounded-md">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2 text-wealth-primary" />
                  <span className="font-medium">Sharpe Ratio</span>
                </div>
                <div className="text-2xl font-bold">{sharpeRatio.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-1">Risk-adjusted return metric</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Risk Recommendations</h3>
            <div className="space-y-4">
              {portfolio.recommendations.map(rec => (
                <div key={rec.id} className="p-4 bg-card border rounded-md">
                  <div className="flex items-start">
                    <div className={`mt-0.5 mr-3 p-1.5 rounded-full ${
                      rec.severity === 'high' ? 'bg-wealth-danger/10 text-wealth-danger' :
                      rec.severity === 'medium' ? 'bg-wealth-warning/10 text-wealth-warning' :
                      'bg-wealth-success/10 text-wealth-success'
                    }`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{rec.asset}</h4>
                      <p className="text-sm text-muted-foreground">{rec.message}</p>
                      {rec.actionRequired && (
                        <div className="mt-2">
                          <a href="#" className="text-sm text-primary hover:underline">Review Recommendation</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;
