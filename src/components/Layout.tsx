
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Bell, Menu, X, FileBarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Assessment', path: '/assessment', icon: FileText },
    { name: 'Schemes', path: '/schemes', icon: FileBarChart2 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="health-gradient text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">HealthBuddy</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button 
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 md:hidden" 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile unless menu is open */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 transform bg-health-blue text-white w-64 md:translate-x-0 transition-transform duration-200 ease-in-out z-30 pt-16",
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <nav className="px-4 pt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                      location.pathname === item.path 
                        ? "bg-health-teal/90 text-health-blue font-medium" 
                        : "hover:bg-health-teal/20"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 ml-0 md:ml-64">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-health-blue text-white py-3 text-center text-sm">
        <div className="container mx-auto">
          © 2025 Health Buddy - AI-Powered Rural Health Assistant
        </div>
      </footer>
    </div>
  );
};

export default Layout;
