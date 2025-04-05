import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User,
  Cog,
  LogOut,
  Bell,
  Shield,
  FileText,
  Heart,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/', icon: Shield },
  ];

  const profileMenu = [
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Cog },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Logout', href: '/logout', icon: LogOut },
  ];

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-health-blue">Pragati ANM</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main Menu Items */}
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Profile Section */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={handleProfileClick}
              >
                <User className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {profileMenu.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleProfileMenuClick}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col w-full p-6 space-y-4">
                  {/* Main Menu Items */}
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  ))}

                  {/* Profile Section */}
                  <div className="border-t mt-4 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Profile</h3>
                    {profileMenu.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
