
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Shield, LineChart } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wealth-primary to-wealth-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-white md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Manage Your Wealth with Confidence
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive portfolio management, risk assessment, and investment opportunities all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-wealth-primary hover:bg-white/90">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                alt="Wealth Management"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Wealth Management Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              WealthCompass offers a suite of tools designed to help you analyze and optimize your investment portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-card border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="bg-wealth-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-wealth-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-muted-foreground">
                Track your investments across multiple asset classes including stocks, bonds, cryptocurrencies, and real estate.
              </p>
            </div>
            
            <div className="p-6 bg-card border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="bg-wealth-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-wealth-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
              <p className="text-muted-foreground">
                Advanced analytics to evaluate your portfolio's risk exposure and receive personalized recommendations.
              </p>
            </div>
            
            <div className="p-6 bg-card border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="bg-wealth-accent/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-wealth-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analysis</h3>
              <p className="text-muted-foreground">
                Visualize your portfolio performance with interactive charts and comprehensive metrics.
              </p>
            </div>
            
            <div className="p-6 bg-card border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="bg-wealth-success/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-wealth-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Marketplace</h3>
              <p className="text-muted-foreground">
                Discover and trade investment opportunities directly with other users on our secure marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Investors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our clients have to say about WealthCompass.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-wealth-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Retail Investor</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "WealthCompass has transformed how I manage my investments. The risk assessment tools have been invaluable in optimizing my portfolio."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-wealth-secondary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  SS
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Smith</h4>
                  <p className="text-sm text-muted-foreground">Financial Planner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As a financial planner, I recommend WealthCompass to all my clients. The comprehensive analytics and easy-to-use interface make financial planning simple."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-wealth-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Retirement Planner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The retirement planning features in WealthCompass have helped me secure my financial future. I can now visualize my long-term goals with confidence."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-wealth-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Managing Your Wealth Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust WealthCompass for comprehensive wealth management solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-wealth-primary hover:bg-white/90">
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
