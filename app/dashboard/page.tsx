'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart,
  AlertCircle,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  // Mock data - will be replaced with real Firebase data
  const metrics = {
    revenue: { value: 45280, change: 12.5, label: 'vs last week' },
    orders: { value: 342, change: 8.3, label: 'vs last week' },
    avgOrderValue: { value: 132.40, change: 3.2, label: 'vs last week' },
    tableOccupancy: { value: 78, change: -2.1, label: 'vs last week' },
  };

  const topInsights = [
    {
      id: 1,
      type: 'pricing',
      title: 'Pricing Opportunity Detected',
      description: 'Your signature pasta is priced 15% below competitors with similar ratings',
      impact: 'high',
      projectedRevenue: 2400,
    },
    {
      id: 2,
      type: 'competitive',
      title: 'Competitor Price Drop',
      description: 'Bella Italia reduced lunch menu prices by 10% this week',
      impact: 'medium',
      projectedRevenue: -800,
    },
    {
      id: 3,
      type: 'operational',
      title: 'Peak Hour Inefficiency',
      description: 'Friday dinner service has 23% longer wait times than optimal',
      impact: 'high',
      projectedRevenue: 1200,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={timeRange === 'day' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange('day')}
              >
                Today
              </Button>
              <Button
                variant={timeRange === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange('week')}
              >
                Week
              </Button>
              <Button
                variant={timeRange === 'month' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange('month')}
              >
                Month
              </Button>
            </div>
          </div>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue.value}
            change={metrics.revenue.change}
            changeLabel={metrics.revenue.label}
            icon={DollarSign}
            format="currency"
            iconColor="text-green-600"
          />
          <MetricCard
            title="Total Orders"
            value={metrics.orders.value}
            change={metrics.orders.change}
            changeLabel={metrics.orders.label}
            icon={ShoppingCart}
            iconColor="text-blue-600"
          />
          <MetricCard
            title="Avg Order Value"
            value={metrics.avgOrderValue.value}
            change={metrics.avgOrderValue.change}
            changeLabel={metrics.avgOrderValue.label}
            icon={TrendingUp}
            format="currency"
            iconColor="text-purple-600"
          />
          <MetricCard
            title="Table Occupancy"
            value={metrics.tableOccupancy.value}
            change={metrics.tableOccupancy.change}
            changeLabel={metrics.tableOccupancy.label}
            icon={Users}
            format="percentage"
            iconColor="text-orange-600"
          />
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>AI Insights & Recommendations</CardTitle>
                <CardDescription>
                  Top opportunities to improve performance
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${
                    insight.impact === 'high'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        Impact: {insight.impact}
                      </span>
                      <span className={`text-sm font-semibold ${
                        insight.projectedRevenue > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {insight.projectedRevenue > 0 ? '+' : ''}
                        ${Math.abs(insight.projectedRevenue).toLocaleString()}/month
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
            icon={BarChart3}
            title="Competitive Analysis"
            description="View competitor insights"
          />
          <QuickActionCard
            icon={DollarSign}
            title="Pricing Optimizer"
            description="Optimize menu pricing"
          />
          <QuickActionCard
            icon={Clock}
            title="Peak Hours"
            description="View predictions"
          />
          <QuickActionCard
            icon={Award}
            title="Compliance"
            description="Regulatory insights"
          />
        </div>
      </main>
    </div>
  );
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-blue-100 rounded-lg mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
