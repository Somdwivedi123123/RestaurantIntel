'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  cuisine: string;
  priceRange: number;
  distance: number;
  avgPrice: number;
  reviewScore: number;
  reviewCount: number;
  lastUpdated: string;
}

export default function CompetitiveIntelligencePage() {
  const [competitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'Bella Italia',
      cuisine: 'Italian',
      priceRange: 3,
      distance: 0.5,
      avgPrice: 28.50,
      reviewScore: 4.5,
      reviewCount: 1243,
      lastUpdated: '2024-01-15',
    },
    {
      id: '2',
      name: 'The Golden Spoon',
      cuisine: 'French',
      priceRange: 4,
      distance: 0.8,
      avgPrice: 45.00,
      reviewScore: 4.7,
      reviewCount: 892,
      lastUpdated: '2024-01-15',
    },
    {
      id: '3',
      name: 'Tokyo House',
      cuisine: 'Japanese',
      priceRange: 3,
      distance: 1.2,
      avgPrice: 32.00,
      reviewScore: 4.3,
      reviewCount: 654,
      lastUpdated: '2024-01-14',
    },
  ]);

  const [insights] = useState([
    {
      id: 1,
      type: 'pricing',
      title: 'Price Gap Opportunity',
      description: 'Your pasta dishes are priced 15% below Bella Italia despite similar quality ratings',
      impact: 'high',
      metric: '+$2,400/month',
      trend: 'up',
    },
    {
      id: 2,
      type: 'menu',
      title: 'Menu Innovation',
      description: 'Tokyo House introduced 3 new fusion dishes last week, gaining 23% more engagement',
      impact: 'medium',
      metric: 'New trend',
      trend: 'neutral',
    },
    {
      id: 3,
      type: 'reviews',
      title: 'Service Speed Advantage',
      description: 'Your service speed reviews are 18% better than The Golden Spoon',
      impact: 'medium',
      metric: 'Competitive edge',
      trend: 'up',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Competitive Intelligence</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze your competition in real-time</p>
            </div>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Competitor
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Insights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      insight.impact === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        insight.impact === 'high' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    {insight.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    )}
                    {insight.trend === 'down' && (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Impact: {insight.impact}
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {insight.metric}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitor Comparison Table */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Competitor Overview</CardTitle>
              <CardDescription>Real-time comparison of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Restaurant</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Cuisine</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Distance</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Reviews</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((competitor) => (
                      <tr key={competitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{competitor.name}</div>
                            <div className="text-sm text-gray-500">
                              {'$'.repeat(competitor.priceRange)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{competitor.cuisine}</td>
                        <td className="py-4 px-4 text-gray-700">{competitor.distance} km</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          ${competitor.avgPrice.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="font-medium text-gray-900">
                              {competitor.reviewScore.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {competitor.reviewCount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing Comparison Chart Placeholder */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Price Comparison Trends</CardTitle>
              <CardDescription>Track pricing changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Chart visualization will be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
