import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  Eye,
  Store,
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Star,
  Users
} from 'lucide-react';

interface Seller {
  id: string;
  name: string;
  email: string;
  businessName: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  joinDate: string;
  lastActive: string;
  totalProducts: number;
  totalSales: number;
  revenue: number;
  rating: number;
  reviewCount: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  category: string;
}

// Mock sellers data
const mockSellers: Seller[] = [
  {
    id: 'SEL001',
    name: 'John Smith',
    email: 'john@techstore.com',
    businessName: 'TechStore Pro',
    status: 'active',
    joinDate: '2024-03-15',
    lastActive: '2025-10-13',
    totalProducts: 45,
    totalSales: 234,
    revenue: 12500.99,
    rating: 4.8,
    reviewCount: 156,
    verificationStatus: 'verified',
    category: 'Electronics'
  },
  {
    id: 'SEL002',
    name: 'Sarah Johnson',
    email: 'sarah@fittech.com',
    businessName: 'FitTech Solutions',
    status: 'active',
    joinDate: '2024-05-20',
    lastActive: '2025-10-12',
    totalProducts: 23,
    totalSales: 89,
    revenue: 5600.50,
    rating: 4.6,
    reviewCount: 67,
    verificationStatus: 'verified',
    category: 'Sports & Fitness'
  },
  {
    id: 'SEL003',
    name: 'Mike Brown',
    email: 'mike@ecowear.com',
    businessName: 'EcoWear',
    status: 'pending',
    joinDate: '2025-10-01',
    lastActive: '2025-10-10',
    totalProducts: 12,
    totalSales: 15,
    revenue: 450.00,
    rating: 4.2,
    reviewCount: 8,
    verificationStatus: 'pending',
    category: 'Clothing'
  },
  {
    id: 'SEL004',
    name: 'Lisa Wang',
    email: 'lisa@photopro.com',
    businessName: 'PhotoPro Equipment',
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '2025-10-13',
    totalProducts: 67,
    totalSales: 145,
    revenue: 18750.25,
    rating: 4.9,
    reviewCount: 203,
    verificationStatus: 'verified',
    category: 'Photography'
  },
  {
    id: 'SEL005',
    name: 'David Wilson',
    email: 'david@officecomfort.com',
    businessName: 'Office Comfort Co',
    status: 'suspended',
    joinDate: '2024-08-12',
    lastActive: '2025-09-28',
    totalProducts: 34,
    totalSales: 78,
    revenue: 3200.75,
    rating: 3.8,
    reviewCount: 42,
    verificationStatus: 'rejected',
    category: 'Furniture'
  },
  {
    id: 'SEL006',
    name: 'Emma Davis',
    email: 'emma@homestyle.com',
    businessName: 'HomeStyle Decor',
    status: 'pending',
    joinDate: '2025-09-28',
    lastActive: '2025-10-11',
    totalProducts: 8,
    totalSales: 3,
    revenue: 125.00,
    rating: 0,
    reviewCount: 0,
    verificationStatus: 'pending',
    category: 'Home & Garden'
  }
];

const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || seller.verificationStatus === verificationFilter;
    const matchesCategory = categoryFilter === 'all' || seller.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesVerification && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (sellerId: string, newStatus: 'active' | 'pending' | 'suspended' | 'rejected') => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId ? { ...seller, status: newStatus } : seller
    ));
  };

  const handleVerificationChange = (sellerId: string, newVerification: 'verified' | 'pending' | 'rejected') => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId ? { ...seller, verificationStatus: newVerification } : seller
    ));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Seller Management</h1>
          <p className="text-gray-300">Manage sellers, approve applications, and monitor performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Sellers</p>
                <p className="text-2xl font-bold text-white">{sellers.length}</p>
                <p className="text-xs text-green-400 mt-1">+12% this month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Active Sellers</p>
                <p className="text-2xl font-bold text-white">{sellers.filter(s => s.status === 'active').length}</p>
                <p className="text-xs text-green-400 mt-1">92% active rate</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Pending Applications</p>
                <p className="text-2xl font-bold text-white">{sellers.filter(s => s.status === 'pending').length}</p>
                <p className="text-xs text-yellow-400 mt-1">Need review</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(sellers.reduce((sum, seller) => sum + seller.revenue, 0))}
                </p>
                <p className="text-xs text-green-400 mt-1">+18% growth</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              <input
                type="text"
                placeholder="Search sellers by name, email, or business name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-white/20 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-[180px]"
              title="Filter by status"
              aria-label="Filter sellers by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Verification Filter */}
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="px-4 py-3 border border-white/20 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-[180px]"
              title="Filter by verification status"
              aria-label="Filter sellers by verification status"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="documents-pending">Documents Pending</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-white/20 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-[180px]"
              title="Filter by category"
              aria-label="Filter sellers by category"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home-garden">Home & Garden</option>
            </select>
          </div>
        </div>

        {/* Sellers Table */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Store Info</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Verification</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-white/20">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-white/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{seller.name}</p>
                          <p className="text-sm text-white/70">{seller.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-white">{seller.businessName}</p>
                        <p className="text-sm text-white/70">{seller.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                        {seller.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(seller.verificationStatus)}`}>
                        {seller.verificationStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-amber-400" />
                        <span className="font-semibold text-white">{seller.totalProducts}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {seller.totalSales}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {formatCurrency(seller.revenue)}
                    </td>
                    <td className="py-4 px-6">
                      {seller.rating > 0 ? renderStars(seller.rating) : (
                        <span className="text-sm text-white/70">No ratings</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-blue-400 hover:bg-white/10 rounded-lg transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-amber-400 hover:bg-white/10 rounded-lg transition-colors" title="Edit Seller">
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        {/* Conditional Action Buttons */}
                        {seller.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(seller.id, 'active')}
                              className="p-2 text-green-400 hover:bg-white/10 rounded-lg transition-colors" 
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(seller.id, 'rejected')}
                              className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors" 
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        
                        {seller.verificationStatus === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleVerificationChange(seller.id, 'verified')}
                              className="p-2 text-green-400 hover:bg-white/10 rounded-lg transition-colors" 
                              title="Verify"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleVerificationChange(seller.id, 'rejected')}
                              className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors" 
                              title="Reject Verification"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSellers.length === 0 && (
            <div className="text-center py-12">
              <Store className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <p className="text-white text-lg">No sellers found</p>
              <p className="text-white/70">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-white/70">
            Showing {filteredSellers.length} of {sellers.length} sellers
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-white/20 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-white/20 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Next
            </button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="mt-8 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300">
              <CheckCircle className="h-5 w-5" />
              Bulk Approve ({sellers.filter(s => s.status === 'pending').length})
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300">
              <TrendingUp className="h-5 w-5" />
              View Analytics
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300">
              <Calendar className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>
    </div>
  );
};

export default SellerManagement;