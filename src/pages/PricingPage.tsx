
import React from 'react';
import Layout from '@/components/layout/Layout';
import PricingPlan from '@/components/pricing/PricingPlan';
import { CheckCircle } from 'lucide-react';

const PricingPage = () => {
  const freePlanFeatures = [
    'Basic portfolio tracking',
    'Up to 10 assets',
    'Asset allocation view',
    'Basic risk assessment',
    'Marketplace access'
  ];
  
  const proPlanFeatures = [
    'Everything in Free plan',
    'Unlimited assets',
    'Advanced risk analysis',
    'Portfolio optimization tools',
    'Performance benchmarking',
    'Custom alerts',
    'API access',
    'Priority support'
  ];
  
  const enterprisePlanFeatures = [
    'Everything in Pro plan',
    'Multi-portfolio management',
    'Team collaboration features',
    'Custom reporting',
    'Advanced tax optimization',
    'Dedicated account manager',
    'Custom integrations',
    'Compliance reporting'
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your investment goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingPlan
            title="Free"
            price="Free"
            description="Perfect for beginners getting started with portfolio management."
            features={freePlanFeatures}
            buttonText="Get Started"
            buttonVariant="outline"
          />
          
          <PricingPlan
            title="Pro"
            price="$19.99"
            description="Advanced tools for serious investors looking to optimize their strategies."
            features={proPlanFeatures}
            isPopular={true}
          />
          
          <PricingPlan
            title="Enterprise"
            price="$49.99"
            description="Professional-grade wealth management for teams and financial advisors."
            features={enterprisePlanFeatures}
            buttonVariant="outline"
          />
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">All Plans Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Secure data encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Real-time market data</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Mobile app access</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Investment tutorials</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Regular updates</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-wealth-success mr-2" />
                <span>Community forums</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Have questions about our pricing or need a custom solution?
            </p>
            <button className="text-primary font-medium hover:underline">
              Contact our sales team
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
