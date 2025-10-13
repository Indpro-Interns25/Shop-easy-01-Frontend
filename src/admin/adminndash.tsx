import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Store,
  BarChart3
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalSellers: number;
  pendingOrders: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

// Mock data
const mockStats: DashboardStats = {
  totalUsers: 12450,
  totalProducts: 3420,
  totalOrders: 8960,
  totalRevenue: 245000,
  totalSellers: 156,
  pendingOrders: 23
};

const recentOrders: RecentOrder[] = [
  { id: 'ORD001', customerName: 'John Doe', amount: 299.99, status: 'pending', date: '2025-10-13' },
  { id: 'ORD002', customerName: 'Jane Smith', amount: 149.50, status: 'processing', date: '2025-10-13' },
  { id: 'ORD003', customerName: 'Mike Johnson', amount: 599.99, status: 'shipped', date: '2025-10-12' },
  { id: 'ORD004', customerName: 'Sarah Wilson', amount: 89.99, status: 'delivered', date: '2025-10-12' },
  { id: 'ORD005', customerName: 'David Brown', amount: 199.99, status: 'pending', date: '2025-10-12' },
];

const AdminDashboard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900/30 text-yellow-300 border border-yellow-600';
      case 'processing': return 'bg-blue-900/30 text-blue-300 border border-blue-600';
      case 'shipped': return 'bg-purple-900/30 text-purple-300 border border-purple-600';
      case 'delivered': return 'bg-green-900/30 text-green-300 border border-green-600';
      case 'cancelled': return 'bg-red-900/30 text-red-300 border border-red-600';
      default: return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };

  return (
    <div className="p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's what's happening with ShopEasy today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Users</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Products</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalProducts.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Orders</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalOrders.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-1">+15% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
                    {/* Total Revenue */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockStats.totalRevenue)}</p>
                <p className="text-xs text-green-400 mt-1">+22% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Sellers */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Active Sellers</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalSellers}</p>
                <p className="text-xs text-green-400 mt-1">+5% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Pending Orders</p>
                <p className="text-2xl font-bold text-white">{mockStats.pendingOrders}</p>
                <p className="text-xs text-red-400 mt-1">Needs attention</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Growth Rate</p>
                <p className="text-2xl font-bold text-white">+18.5%</p>
                <p className="text-xs text-green-400 mt-1">Monthly growth</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
              <TrendingUp className="h-5 w-5 text-amber-500" />
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">#{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(order.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors">
              View All Orders
            </button>
          </div>

          {/* Quick Actions */}
                    {/* Quick Actions */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <button className="w-full p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-between">
                <span>Manage Products</span>
                <Package className="h-5 w-5" />
              </button>
              
              <button className="w-full p-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-between">
                <span>Manage Users</span>
                <Users className="h-5 w-5" />
              </button>
              
              <button className="w-full p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-between">
                <span>View Analytics</span>
                <BarChart3 className="h-5 w-5" />
              </button>
              
              <button className="w-full p-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-between">
                <span>Seller Management</span>
                <Store className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-red-900/20 to-amber-900/20 border border-red-400/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <p className="font-semibold text-red-300">Urgent</p>
              </div>
              <p className="text-sm text-white/80">
                {mockStats.pendingOrders} orders pending approval
              </p>
              <button className="mt-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                Review Now →
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;