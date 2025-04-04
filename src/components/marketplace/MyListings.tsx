
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getUserItems } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

const MyListings = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  const userItems = getUserItems(user.id);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };
  
  const handleEdit = (itemId: string) => {
    toast.info('Edit functionality will be implemented in a future update');
  };
  
  const handleDelete = (itemId: string, title: string) => {
    toast.success(`"${title}" has been removed from your listings`);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>My Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {userItems.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Listed Date</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(item.listedDate)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDelete(item.id, item.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">You haven't listed any items for sale yet.</p>
            <Button asChild>
              <a href="#create-listing">Create Your First Listing</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyListings;
