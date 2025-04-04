
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPortfolio, assetTypeColors, AssetType } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AssetTable = () => {
  const { user } = useAuth();
  const portfolio = user ? getUserPortfolio(user.username) : null;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No asset data available</p>
        </CardContent>
      </Card>
    );
  }
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };
  
  const calculateReturn = (current: number, purchase: number) => {
    const returnValue = ((current - purchase) / purchase) * 100;
    return returnValue;
  };
  
  const formatAssetType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Filter assets based on search and type filter
  const filteredAssets = portfolio.assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType ? asset.type === filterType : true;
    
    return matchesSearch && matchesType;
  });
  
  // Get unique asset types for filter
  const assetTypes = Array.from(new Set(portfolio.assets.map(asset => asset.type)));
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Portfolio Assets</CardTitle>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  {filterType ? formatAssetType(filterType) : 'All Asset Types'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  All Asset Types
                </DropdownMenuItem>
                {assetTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                    {formatAssetType(type)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Purchase Price</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Return</TableHead>
                <TableHead className="text-right">Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => {
                  const returnPercent = calculateReturn(asset.currentPrice, asset.purchasePrice);
                  return (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{ backgroundColor: assetTypeColors[asset.type as AssetType] }}
                          className="text-white"
                        >
                          {formatAssetType(asset.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{asset.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.purchasePrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(asset.currentPrice)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(asset.value)}</TableCell>
                      <TableCell className={`text-right ${returnPercent >= 0 ? 'text-wealth-success' : 'text-wealth-danger'}`}>
                        {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">{asset.allocation.toFixed(2)}%</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No assets found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetTable;
