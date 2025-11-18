'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingUp, DollarSign, AlertCircle, CheckCircle, X } from 'lucide-react';

interface PricingRecommendation {
  id: string;
  itemName: string;
  category: string;
  currentPrice: number;
  recommendedPrice: number;
  projectedImpact: {
    revenue: number;
    demand: number;
    profit: number;
  };
  reasoning: string;
  confidence: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function PricingOptimizerPage() {
  const [recommendations, setRecommendations] = useState<PricingRecommendation[]>([
    {
      id: '1',
      itemName: 'Truffle Pasta',
      category: 'Main Course',
      currentPrice: 24.00,
      recommendedPrice: 28.00,
      projectedImpact: {
        revenue: 12.5,
        demand: -3.2,
        profit: 450,
      },
      reasoning: 'Competitor analysis shows 15% underpricing. High demand with low price sensitivity.',
      confidence: 0.89,
      status: 'pending',
    },
    {
      id: '2',
      itemName: 'Caesar Salad',
      category: 'Appetizer',
      currentPrice: 12.00,
      recommendedPrice: 11.00,
      projectedImpact: {
        revenue: 8.3,
        demand: 15.4,
        profit: 280,
      },
      reasoning: 'Price reduction to capture market share. High volume compensates for margin.',
      confidence: 0.76,
      status: 'pending',
    },
    {
      id: '3',
      itemName: 'Tiramisu',
      category: 'Dessert',
      currentPrice: 8.00,
      recommendedPrice: 9.50,
      projectedImpact: {
        revenue: 15.2,
        demand: -2.1,
        profit: 320,
      },
      reasoning: 'Premium dessert with strong brand association. Low competition at higher price point.',
      confidence: 0.82,
      status: 'pending',
    },
  ]);

  const handleAccept = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: 'accepted' as const } : rec)
    );
  };

  const handleReject = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: 'rejected' as const } : rec)
    );
  };

  const totalProjectedRevenue = recommendations
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.projectedImpact.profit, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dynamic Pricing Optimizer</h1>
              <p className="text-gray-600 mt-1">AI-powered menu pricing recommendations</p>
            </div>
            <Button variant="primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Run Analysis
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Potential Revenue</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    +${totalProjectedRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">per month</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Recommendations</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {recommendations.filter(r => r.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">items to review</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {(recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">AI certainty</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Recommendations</CardTitle>
            <CardDescription>
              Review and apply AI-generated pricing suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-6 border rounded-lg ${
                    rec.status === 'accepted'
                      ? 'bg-green-50 border-green-200'
                      : rec.status === 'rejected'
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  } transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{rec.itemName}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {rec.category}
                        </span>
                        {rec.status === 'accepted' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Accepted
                          </span>
                        )}
                        {rec.status === 'rejected' && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium flex items-center gap-1">
                            <X className="w-3 h-3" />
                            Rejected
                          </span>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <div className="flex items-baseline gap-4 mb-2">
                            <div>
                              <p className="text-sm text-gray-600">Current Price</p>
                              <p className="text-2xl font-bold text-gray-900">
                                ${rec.currentPrice.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-2xl text-gray-400">→</div>
                            <div>
                              <p className="text-sm text-gray-600">Recommended</p>
                              <p className="text-2xl font-bold text-blue-600">
                                ${rec.recommendedPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{rec.reasoning}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Projected Impact</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Revenue Change:</span>
                              <span className={`font-semibold ${
                                rec.projectedImpact.revenue > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {rec.projectedImpact.revenue > 0 ? '+' : ''}
                                {rec.projectedImpact.revenue.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Demand Change:</span>
                              <span className={`font-semibold ${
                                rec.projectedImpact.demand > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {rec.projectedImpact.demand > 0 ? '+' : ''}
                                {rec.projectedImpact.demand.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Monthly Profit:</span>
                              <span className="font-semibold text-green-600">
                                +${rec.projectedImpact.profit.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-sm text-gray-600">Confidence:</span>
                              <span className="font-semibold text-purple-600">
                                {(rec.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {rec.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAccept(rec.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(rec.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
