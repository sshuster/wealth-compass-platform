
import React from 'react';
import Layout from '@/components/layout/Layout';
import MarketplaceList from '@/components/marketplace/MarketplaceList';
import MyListings from '@/components/marketplace/MyListings';
import CreateListing from '@/components/marketplace/CreateListing';

const MarketplacePage = () => {
  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Listings</h2>
          <MarketplaceList />
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
          <MyListings />
        </div>
        
        <div id="create-listing">
          <h2 className="text-2xl font-semibold mb-4">Create New Listing</h2>
          <CreateListing />
        </div>
      </div>
    </Layout>
  );
};

export default MarketplacePage;
