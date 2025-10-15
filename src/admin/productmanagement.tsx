import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  DollarSign,
  Tag
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image: string;
  createdAt: string;
  seller: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'PRD001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    stock: 45,
    status: 'active',
    image: '/api/placeholder/100/100',
    createdAt: '2025-10-10',
    seller: 'TechStore Pro'
  },
  {
    id: 'PRD002',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS',
    price: 299.99,
    category: 'Electronics',
    stock: 23,
    status: 'active',
    image: '/api/placeholder/100/100',
    createdAt: '2025-10-08',
    seller: 'FitTech Solutions'
  },
  {
    id: 'PRD003',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt in various colors',
    price: 29.99,
    category: 'Clothing',
    stock: 0,
    status: 'out_of_stock',
    image: '/api/placeholder/100/100',
    createdAt: '2025-10-05',
    seller: 'EcoWear'
  },
  {
    id: 'PRD004',
    name: 'Professional Camera Lens',
    description: '85mm f/1.8 portrait lens for professional photography',
    price: 599.99,
    category: 'Electronics',
    stock: 12,
    status: 'active',
    image: '/api/placeholder/100/100',
    createdAt: '2025-10-03',
    seller: 'PhotoPro Equipment'
  },
  {
    id: 'PRD005',
    name: 'Ergonomic Office Chair',
    description: 'Lumbar support office chair with adjustable height and armrests',
    price: 349.99,
    category: 'Furniture',
    stock: 18,
    status: 'active',
    image: '/api/placeholder/100/100',
    createdAt: '2025-10-01',
    seller: 'Office Comfort Co'
  }
];

const categories = ['All Categories', 'Electronics', 'Clothing', 'Furniture', 'Home & Garden', 'Books', 'Sports'];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border border-green-600';
      case 'inactive': return 'bg-gray-500/20 text-gray-300 border border-gray-600';
      case 'out_of_stock': return 'bg-red-500/20 text-red-300 border border-red-600';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-600';
    }
  };

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'text-red-400';
    if (stock < 20) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="p-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
            <p className="text-gray-300">Manage your e-commerce product catalog</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              <input
                type="text"
                placeholder="Search products, sellers, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-white/20 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-[200px]"
              title="Filter by category"
              aria-label="Filter products by category"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-white/20 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-[150px]"
              title="Filter by status"
              aria-label="Filter products by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Package className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-white/70">Total Products</p>
                <p className="text-xl font-bold text-white">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Tag className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Active Products</p>
                <p className="text-xl font-bold text-white">{products.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Package className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Out of Stock</p>
                <p className="text-xl font-bold text-white">{products.filter(p => p.status === 'out_of_stock').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Avg. Price</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(products.reduce((sum, p) => sum + p.price, 0) / products.length)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-white/80">Seller</th>
                  <th className="text-center py-4 px-6 font-semibold text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-300" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="text-sm text-gray-300 truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-600 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${getStockStatusColor(product.stock)}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-300">
                      {product.seller}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="View product"
                          aria-label="View product"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-2 text-orange-400 hover:bg-orange-500/20 rounded-lg transition-colors"
                          title="Edit product"
                          aria-label="Edit product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete product"
                          aria-label="Delete product"
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
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No products found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
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

        {/* Add Product Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <p className="text-gray-600 mb-6">Product creation form will be implemented here.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;