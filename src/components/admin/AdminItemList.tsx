
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllItems, removeItem } from '@/data/mockData';
import { Search, Shield, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const AdminItemList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [items, setItems] = useState(getAllItems());
  const [itemToRemove, setItemToRemove] = useState<{ id: string, title: string } | null>(null);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };
  
  // Get unique item types for filtering
  const itemTypes = Array.from(new Set(items.map(item => item.type)));
  
  // Filter items based on search and type filter
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? item.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });
  
  const handleRemoveItem = () => {
    if (itemToRemove) {
      const success = removeItem(itemToRemove.id);
      if (success) {
        setItems(getAllItems());
        toast.success(`"${itemToRemove.title}" has been removed by admin action`);
      } else {
        toast.error('Failed to remove item');
      }
      setItemToRemove(null);
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-wealth-primary" />
            <CardTitle>Admin: Marketplace Items</CardTitle>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedType === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              {itemTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
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
                    <TableCell>
                      {item.userId === 1 ? 'muser' : 'mvc'}
                    </TableCell>
                    <TableCell>{formatDate(item.listedDate)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setItemToRemove({ id: item.id, title: item.title })}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span>Remove</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Remove Item</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to remove this item?
                              <div className="mt-2 p-3 bg-muted rounded-md">
                                <p className="font-semibold">{itemToRemove?.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  This action cannot be undone.
                                </p>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button variant="destructive" onClick={handleRemoveItem}>
                                Remove
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No items found matching your criteria
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

export default AdminItemList;
