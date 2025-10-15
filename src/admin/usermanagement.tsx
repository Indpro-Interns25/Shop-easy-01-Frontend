import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Shield,
  Ban,
  CheckCircle
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  avatar: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-08-15',
    lastLogin: '2025-10-13',
    totalOrders: 12,
    totalSpent: 1299.99,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    role: 'seller',
    status: 'active',
    joinDate: '2024-06-20',
    lastLogin: '2025-10-12',
    totalOrders: 0,
    totalSpent: 0,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'USR003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    role: 'customer',
    status: 'inactive',
    joinDate: '2024-09-10',
    lastLogin: '2025-09-25',
    totalOrders: 3,
    totalSpent: 199.99,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'USR004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2025-10-13',
    totalOrders: 0,
    totalSpent: 0,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'USR005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    role: 'customer',
    status: 'banned',
    joinDate: '2024-07-05',
    lastLogin: '2025-08-15',
    totalOrders: 2,
    totalSpent: 89.99,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'USR006',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    role: 'seller',
    status: 'active',
    joinDate: '2024-05-12',
    lastLogin: '2025-10-11',
    totalOrders: 0,
    totalSpent: 0,
    avatar: '/api/placeholder/40/40'
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500/20 text-purple-300 border border-purple-600';
      case 'seller': return 'bg-orange-500/20 text-orange-300 border border-orange-600';
      case 'customer': return 'bg-green-500/20 text-green-300 border border-green-600';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border border-green-600';
      case 'inactive': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-600';
      case 'banned': return 'bg-red-500/20 text-red-300 border border-red-600';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'seller': return <UserCheck className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'banned') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-300">Manage users, sellers, and administrators</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-xs text-green-400 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Active Users</p>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-xs text-green-400 mt-1">85% active rate</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-700 rounded-xl">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Sellers</p>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'seller').length}</p>
                <p className="text-xs text-blue-400 mt-1">Growing steadily</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Banned Users</p>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'banned').length}</p>
                <p className="text-xs text-red-400 mt-1">Need attention</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl">
                <UserX className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[150px]"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customers</option>
              <option value="seller">Sellers</option>
              <option value="admin">Admins</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/80">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Last Login</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Orders</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-200">Total Spent</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-700/40' : 'bg-gray-800/40'}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user.name}</p>
                          <p className="text-sm text-gray-300 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.joinDate)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-300">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="py-4 px-6 text-sm text-white font-semibold">
                      {user.totalOrders}
                    </td>
                    <td className="py-4 px-6 text-sm text-white font-semibold">
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-orange-400 hover:bg-orange-500/20 rounded-lg transition-colors" title="Edit User">
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        {/* Status Change Buttons */}
                        {user.status === 'active' && (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'banned')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Ban User"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                        
                        {(user.status === 'banned' || user.status === 'inactive') && (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'active')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Activate User"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No users found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
    </div>
  );
};

export default UserManagement;