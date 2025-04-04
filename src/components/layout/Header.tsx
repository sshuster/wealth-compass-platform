
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getUserMessages } from '@/data/mockData';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const userMessages = user ? getUserMessages(user.id) : [];
  const unreadCount = userMessages.filter(msg => !msg.read).length;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-wealth-primary">
            <span className="text-primary">Wealth</span>
            <span className="text-wealth-secondary">Compass</span>
          </Link>
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        <nav className={`${isMenuOpen ? 'flex absolute top-16 right-0 left-0 flex-col bg-card border-b border-border p-4 shadow-md' : 'hidden'} md:flex md:items-center md:static md:shadow-none md:border-0 md:p-0`}>
          {isAuthenticated ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/portfolio" className="text-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <Link to="/market" className="text-foreground hover:text-primary transition-colors">
                  Market
                </Link>
                {isAdmin ? (
                  <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
                    Admin Panel
                  </Link>
                ) : (
                  <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
                    Marketplace
                  </Link>
                )}
                <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
                
                <div className="relative md:ml-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Bell />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-wealth-danger text-white">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {userMessages.length > 0 ? (
                        userMessages.slice(0, 3).map((msg) => (
                          <DropdownMenuItem key={msg.id} className={!msg.read ? 'font-semibold' : ''}>
                            <div className="flex flex-col">
                              <span>{msg.title}</span>
                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {msg.message}
                              </span>
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem>No notifications</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="justify-center">
                        <Link to="/notifications" className="text-primary text-sm">View all</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-2 flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user && getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{user?.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
