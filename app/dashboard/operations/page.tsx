'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Users, TrendingUp, Calendar } from 'lucide-react';

interface PeakHourPrediction {
  hour: string;
  predictedCustomers: number;
  confidence: number;
  recommendedStaff: {
    waiters: number;
    kitchen: number;
    host: number;
  };
  expectedTurnover: number;
}

export default function OperationsPage() {
  const [selectedDay, setSelectedDay] = useState('today');

  const [predictions] = useState<PeakHourPrediction[]>([
    {
      hour: '11:00 AM',
      predictedCustomers: 45,
      confidence: 0.82,
      recommendedStaff: { waiters: 3, kitchen: 2, host: 1 },
      expectedTurnover: 1.8,
    },
    {
      hour: '12:00 PM',
      predictedCustomers: 95,
      confidence: 0.91,
      recommendedStaff: { waiters: 5, kitchen: 4, host: 2 },
      expectedTurnover: 2.3,
    },
    {
      hour: '1:00 PM',
      predictedCustomers: 110,
      confidence: 0.88,
      recommendedStaff: { waiters: 6, kitchen: 4, host: 2 },
      expectedTurnover: 2.5,
    },
    {
      hour: '2:00 PM',
      predictedCustomers: 65,
      confidence: 0.79,
      recommendedStaff: { waiters: 4, kitchen: 3, host: 1 },
      expectedTurnover: 2.0,
    },
    {
      hour: '6:00 PM',
      predictedCustomers: 85,
      confidence: 0.85,
      recommendedStaff: { waiters: 5, kitchen: 3, host: 2 },
      expectedTurnover: 2.2,
    },
    {
      hour: '7:00 PM',
      predictedCustomers: 125,
      confidence: 0.93,
      recommendedStaff: { waiters: 7, kitchen: 5, host: 2 },
      expectedTurnover: 2.4,
    },
    {
      hour: '8:00 PM',
      predictedCustomers: 105,
      confidence: 0.87,
      recommendedStaff: { waiters: 6, kitchen: 4, host: 2 },
      expectedTurnover: 2.1,
    },
  ]);

  const peakHour = predictions.reduce((max, pred) =>
    pred.predictedCustomers > max.predictedCustomers ? pred : max
  );

  const totalStaffNeeded = predictions.reduce((max, pred) => {
    const total = pred.recommendedStaff.waiters + pred.recommendedStaff.kitchen + pred.recommendedStaff.host;
    const maxTotal = max.recommendedStaff.waiters + max.recommendedStaff.kitchen + max.recommendedStaff.host;
    return total > maxTotal ? pred : max;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Operations & Peak Hours</h1>
              <p className="text-gray-600 mt-1">Optimize staffing and operations with AI predictions</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedDay === 'today' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay('today')}
              >
                Today
              </Button>
              <Button
                variant={selectedDay === 'tomorrow' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay('tomorrow')}
              >
                Tomorrow
              </Button>
              <Button
                variant={selectedDay === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay('week')}
              >
                This Week
              </Button>
            </div>
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
                  <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{peakHour.hour}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {peakHour.predictedCustomers} customers
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Max Staff Needed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {totalStaffNeeded.recommendedStaff.waiters +
                     totalStaffNeeded.recommendedStaff.kitchen +
                     totalStaffNeeded.recommendedStaff.host}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">total employees</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Turnover</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {(predictions.reduce((sum, p) => sum + p.expectedTurnover, 0) / predictions.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">tables/hour</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">prediction accuracy</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Predictions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Hourly Demand Forecast</CardTitle>
            <CardDescription>Predicted customer traffic and staffing recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((pred, index) => {
                const isPeak = pred.predictedCustomers === peakHour.predictedCustomers;
                const demandLevel = pred.predictedCustomers > 100 ? 'high' : pred.predictedCustomers > 60 ? 'medium' : 'low';

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      isPeak
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{pred.hour}</p>
                          {isPeak && (
                            <span className="text-xs text-blue-600 font-medium">PEAK</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-gray-900">
                              {pred.predictedCustomers}
                            </p>
                            <p className="text-sm text-gray-600">customers</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              demandLevel === 'high'
                                ? 'bg-red-100 text-red-700'
                                : demandLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {demandLevel.toUpperCase()} DEMAND
                            </span>
                            <span className="text-xs text-gray-500">
                              {(pred.confidence * 100).toFixed(0)}% confidence
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Recommended Staff</p>
                          <div className="flex gap-4">
                            <div className="text-center">
                              <p className="text-xl font-bold text-blue-600">
                                {pred.recommendedStaff.waiters}
                              </p>
                              <p className="text-xs text-gray-600">Waiters</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-purple-600">
                                {pred.recommendedStaff.kitchen}
                              </p>
                              <p className="text-xs text-gray-600">Kitchen</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-green-600">
                                {pred.recommendedStaff.host}
                              </p>
                              <p className="text-xs text-gray-600">Host</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Table Turnover</p>
                          <p className="text-xl font-bold text-gray-900">
                            {pred.expectedTurnover.toFixed(1)}
                          </p>
                          <p className="text-xs text-gray-600">tables/hour</p>
                        </div>
                      </div>
                    </div>

                    {/* Visual demand bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          demandLevel === 'high'
                            ? 'bg-red-500'
                            : demandLevel === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${(pred.predictedCustomers / 125) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* External Factors */}
        <Card>
          <CardHeader>
            <CardTitle>External Factors</CardTitle>
            <CardDescription>Events and conditions affecting predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Weather</p>
                <p className="text-sm text-blue-700 mt-1">Sunny, 72°F</p>
                <p className="text-xs text-blue-600 mt-2">+8% demand expected</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Local Events</p>
                <p className="text-sm text-purple-700 mt-1">Concert at City Hall</p>
                <p className="text-xs text-purple-600 mt-2">+15% evening traffic</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-medium text-green-900">Day Type</p>
                <p className="text-sm text-green-700 mt-1">Friday</p>
                <p className="text-xs text-green-600 mt-2">High dinner demand</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
