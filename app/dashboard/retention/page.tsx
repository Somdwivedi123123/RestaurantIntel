'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, TrendingDown, Heart, Mail, Gift, AlertCircle } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  segment: 'vip' | 'regular' | 'occasional' | 'at-risk';
  visitCount: number;
  totalSpent: number;
  avgSpent: number;
  lastVisit: string;
  churnProbability: number;
  retentionStrategy: string;
  lifetimeValue: number;
}

export default function RetentionPage() {
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const [guests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      segment: 'vip',
      visitCount: 24,
      totalSpent: 2840,
      avgSpent: 118,
      lastVisit: '2024-01-12',
      churnProbability: 0.12,
      retentionStrategy: 'Send exclusive wine tasting invitation',
      lifetimeValue: 3500,
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      segment: 'at-risk',
      visitCount: 8,
      totalSpent: 680,
      avgSpent: 85,
      lastVisit: '2023-11-20',
      churnProbability: 0.78,
      retentionStrategy: 'Offer 20% off comeback discount',
      lifetimeValue: 950,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      segment: 'regular',
      visitCount: 15,
      totalSpent: 1450,
      avgSpent: 97,
      lastVisit: '2024-01-08',
      churnProbability: 0.25,
      retentionStrategy: 'Birthday month special offer',
      lifetimeValue: 1800,
    },
    {
      id: '4',
      name: 'David Park',
      email: 'dpark@email.com',
      segment: 'occasional',
      visitCount: 3,
      totalSpent: 210,
      avgSpent: 70,
      lastVisit: '2023-12-15',
      churnProbability: 0.45,
      retentionStrategy: 'Send menu highlights email',
      lifetimeValue: 420,
    },
  ]);

  const filteredGuests = selectedSegment === 'all'
    ? guests
    : guests.filter(g => g.segment === selectedSegment);

  const segments = [
    { id: 'all', name: 'All Guests', count: guests.length, color: 'gray' },
    { id: 'vip', name: 'VIP', count: guests.filter(g => g.segment === 'vip').length, color: 'purple' },
    { id: 'regular', name: 'Regular', count: guests.filter(g => g.segment === 'regular').length, color: 'blue' },
    { id: 'occasional', name: 'Occasional', count: guests.filter(g => g.segment === 'occasional').length, color: 'green' },
    { id: 'at-risk', name: 'At Risk', count: guests.filter(g => g.segment === 'at-risk').length, color: 'red' },
  ];

  const atRiskGuests = guests.filter(g => g.churnProbability > 0.5);
  const totalLifetimeValue = guests.reduce((sum, g) => sum + g.lifetimeValue, 0);
  const avgChurnRate = guests.reduce((sum, g) => sum + g.churnProbability, 0) / guests.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Guest Retention Engine</h1>
              <p className="text-gray-600 mt-1">Predict churn and automate retention campaigns</p>
            </div>
            <Button variant="primary">
              <Mail className="w-4 h-4 mr-2" />
              Send Campaign
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Guests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{guests.length}</p>
                  <p className="text-sm text-gray-500 mt-1">active customers</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At Risk</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{atRiskGuests.length}</p>
                  <p className="text-sm text-gray-500 mt-1">high churn risk</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${(totalLifetimeValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-500 mt-1">total potential</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Churn Risk</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {(avgChurnRate * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">probability</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Filter */}
        <div className="flex gap-2 mb-6">
          {segments.map((segment) => (
            <Button
              key={segment.id}
              variant={selectedSegment === segment.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedSegment(segment.id)}
            >
              {segment.name} ({segment.count})
            </Button>
          ))}
        </div>

        {/* Guest List */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Database</CardTitle>
            <CardDescription>
              Showing {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredGuests.map((guest) => {
                const isHighRisk = guest.churnProbability > 0.5;
                const segmentConfig = {
                  vip: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
                  regular: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
                  occasional: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
                  'at-risk': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
                };

                const config = segmentConfig[guest.segment];

                return (
                  <div
                    key={guest.id}
                    className={`p-6 border-2 rounded-lg ${config.bg} ${config.border}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{guest.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
                            {guest.segment.toUpperCase()}
                          </span>
                          {isHighRisk && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              HIGH CHURN RISK
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{guest.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button variant="primary" size="sm">
                          <Gift className="w-4 h-4 mr-1" />
                          Send Offer
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Visits</p>
                        <p className="text-xl font-bold text-gray-900">{guest.visitCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-xl font-bold text-gray-900">${guest.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Spend</p>
                        <p className="text-xl font-bold text-gray-900">${guest.avgSpent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Visit</p>
                        <p className="text-xl font-bold text-gray-900">
                          {new Date(guest.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">LTV</p>
                        <p className="text-xl font-bold text-green-600">${guest.lifetimeValue}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Churn Probability</span>
                        <span className={`text-sm font-bold ${
                          guest.churnProbability > 0.5 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {(guest.churnProbability * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            guest.churnProbability > 0.5
                              ? 'bg-red-500'
                              : guest.churnProbability > 0.3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${guest.churnProbability * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Recommended Retention Strategy
                      </p>
                      <p className="text-sm text-gray-600">{guest.retentionStrategy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Automated Campaigns */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Automated Retention Campaigns</CardTitle>
            <CardDescription>Smart campaigns triggered by guest behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Win-Back Campaign</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      Auto-send 20% discount to guests who haven&apos;t visited in 60+ days
                    </p>
                    <span className="text-xs font-medium text-blue-700">
                      2 guests eligible this week
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded">
                    <Gift className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">VIP Rewards</h4>
                    <p className="text-sm text-purple-800 mb-2">
                      Send exclusive offers to high-value guests monthly
                    </p>
                    <span className="text-xs font-medium text-purple-700">
                      1 VIP guest ready
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Birthday Special</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Automatic birthday month offers with complimentary dessert
                    </p>
                    <span className="text-xs font-medium text-green-700">
                      Active for all guests
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded">
                    <TrendingDown className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">Churn Prevention</h4>
                    <p className="text-sm text-orange-800 mb-2">
                      AI-triggered intervention for high churn probability guests
                    </p>
                    <span className="text-xs font-medium text-orange-700">
                      1 guest at risk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
