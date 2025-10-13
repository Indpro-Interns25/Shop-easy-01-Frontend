import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  conversionRate: number;
  totalSales: number;
  revenue: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

interface DeviceStats {
  device: string;
  users: number;
  percentage: number;
  icon: React.ReactNode;
}

interface PopularPage {
  page: string;
  views: number;
  uniqueViews: number;
  bounceRate: number;
}

// Mock analytics data
const mockAnalytics: AnalyticsData = {
  totalVisitors: 45234,
  uniqueVisitors: 32156,
  pageViews: 128945,
  bounceRate: 32.5,
  avgSessionDuration: '3m 42s',
  conversionRate: 2.8,
  totalSales: 1234,
  revenue: 89567.50
};

const trafficSources: TrafficSource[] = [
  { source: 'Organic Search', visitors: 18520, percentage: 41, color: 'bg-green-500' },
  { source: 'Direct', visitors: 13570, percentage: 30, color: 'bg-blue-500' },
  { source: 'Social Media', visitors: 6780, percentage: 15, color: 'bg-purple-500' },
  { source: 'Email', visitors: 4520, percentage: 10, color: 'bg-amber-500' },
  { source: 'Paid Ads', visitors: 1844, percentage: 4, color: 'bg-red-500' }
];

const deviceStats: DeviceStats[] = [
  { 
    device: 'Desktop', 
    users: 25634, 
    percentage: 56.7, 
    icon: <Monitor className="h-5 w-5" /> 
  },
  { 
    device: 'Mobile', 
    users: 16890, 
    percentage: 37.3, 
    icon: <Smartphone className="h-5 w-5" /> 
  },
  { 
    device: 'Tablet', 
    users: 2710, 
    percentage: 6.0, 
    icon: <Globe className="h-5 w-5" /> 
  }
];

const popularPages: PopularPage[] = [
  { page: '/home', views: 34520, uniqueViews: 28450, bounceRate: 25.2 },
  { page: '/products', views: 28940, uniqueViews: 23780, bounceRate: 35.8 },
  { page: '/product/electronics', views: 15670, uniqueViews: 12340, bounceRate: 28.9 },
  { page: '/login', views: 12450, uniqueViews: 11230, bounceRate: 15.6 },
  { page: '/cart', views: 8940, uniqueViews: 8120, bounceRate: 45.2 }
];

const WebsiteAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState('7days');


  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Website Analytics</h1>
            <p className="text-gray-300">Track your website performance and user behavior</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Visitors</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.totalVisitors)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+12.5% vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Page Views</p>
                <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.pageViews)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+8.3% vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">{mockAnalytics.conversionRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-sm text-red-400">-2.1% vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                <MousePointer className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(mockAnalytics.revenue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+15.8% vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/70">Bounce Rate</p>
              <TrendingDown className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{mockAnalytics.bounceRate}%</p>
            <p className="text-sm text-green-400">-3.2% improvement</p>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/70">Avg. Session Duration</p>
              <Clock className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{mockAnalytics.avgSessionDuration}</p>
            <p className="text-sm text-blue-400">+0.8% increase</p>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/70">Total Sales</p>
              <ShoppingCart className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">{formatNumber(mockAnalytics.totalSales)}</p>
            <p className="text-sm text-amber-400">+22.4% increase</p>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Sources */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Traffic Sources</h2>
              <BarChart3 className="h-5 w-5 text-amber-400" />
            </div>
            
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-4 h-4 rounded-full ${source.color}`}></div>
                    <span className="font-medium text-white">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/70">{formatNumber(source.visitors)}</span>
                    <div className="w-20 bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${source.color}`}
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-white/70 w-8">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Statistics */}
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Device Usage</h2>
              <Monitor className="h-5 w-5 text-amber-400" />
            </div>
            
            <div className="space-y-6">
              {deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg text-amber-400">
                      {device.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{device.device}</p>
                      <p className="text-sm text-white/70">{formatNumber(device.users)} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{device.percentage}%</p>
                    <div className="w-16 bg-white/20 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 bg-amber-500 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Popular Pages</h2>
            <Eye className="h-5 w-5 text-amber-400" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 font-semibold text-white/70">Page</th>
                  <th className="text-left py-3 px-4 font-semibold text-white/70">Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-white/70">Unique Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-white/70">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {popularPages.map((page, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/10">
                    <td className="py-3 px-4">
                      <span className="font-medium text-white">{page.page}</span>
                    </td>
                    <td className="py-3 px-4 text-white/70">
                      {formatNumber(page.views)}
                    </td>
                    <td className="py-3 px-4 text-white/70">
                      {formatNumber(page.uniqueViews)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.bounceRate < 30 ? 'bg-green-500/20 text-green-400' :
                        page.bounceRate < 40 ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {page.bounceRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Real-time Users</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">127</p>
            <p className="text-sm text-white/70">Active users right now</p>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Sales</h3>
              <Calendar className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{formatCurrency(3247.50)}</p>
            <p className="text-sm text-green-400">+18% vs yesterday</p>
          </div>

          <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Page Load Speed</h3>
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">1.8s</p>
            <p className="text-sm text-green-400">-0.3s improvement</p>
          </div>
        </div>
    </div>
  );
};

export default WebsiteAnalysis;