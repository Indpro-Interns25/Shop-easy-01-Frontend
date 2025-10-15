import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Store,
  BarChart3,
  Menu,
  X,
  LogOut,
  Bell,
  Settings
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      description: 'Overview & Analytics'
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: <Package className="h-5 w-5" />,
      description: 'Manage Products'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: <Users className="h-5 w-5" />,
      description: 'User Management'
    },
    { 
      id: 'sellers', 
      label: 'Sellers', 
      icon: <Store className="h-5 w-5" />,
      description: 'Seller Management'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Website Analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Sidebar Overlay */}
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex h-full flex-col bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border-r border-white/10 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <span className="text-xl font-bold text-white">ShopEasy</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Close sidebar"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20'
                    : 'hover:bg-white/10 text-white/70 hover:text-white border border-transparent hover:border-white/20'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  currentPage === item.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-xs ${
                    currentPage === item.id ? 'text-orange-100' : 'text-gray-400'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Admin Profile */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Admin User</p>
                <p className="text-xs text-white/70">admin@shopeasy.com</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2 text-white/70 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
                {/* Header */}
        <header className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-lg"
              title="Open sidebar"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-white/70 cursor-pointer hover:text-amber-400 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-amber-300">Online</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
                {/* Main Content */}
        <main className="flex-1 min-h-0 bg-transparent overflow-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;