'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react';

interface Inspection {
  id: string;
  restaurantName: string;
  isYours: boolean;
  date: string;
  score: number;
  result: 'pass' | 'conditional' | 'fail';
  violations: {
    code: string;
    description: string;
    severity: 'critical' | 'major' | 'minor';
    corrected: boolean;
  }[];
}

export default function RegulatoryPage() {
  const [inspections] = useState<Inspection[]>([
    {
      id: '1',
      restaurantName: 'Your Restaurant',
      isYours: true,
      date: '2024-01-10',
      score: 95,
      result: 'pass',
      violations: [
        {
          code: 'MIN-001',
          description: 'Hand washing sink missing soap dispenser',
          severity: 'minor',
          corrected: true,
        },
      ],
    },
    {
      id: '2',
      restaurantName: 'Bella Italia',
      isYours: false,
      date: '2024-01-08',
      score: 78,
      result: 'conditional',
      violations: [
        {
          code: 'MAJ-005',
          description: 'Improper food storage temperature',
          severity: 'major',
          corrected: false,
        },
        {
          code: 'MIN-003',
          description: 'Missing food handler certificates',
          severity: 'minor',
          corrected: false,
        },
      ],
    },
    {
      id: '3',
      restaurantName: 'Tokyo House',
      isYours: false,
      date: '2024-01-05',
      score: 92,
      result: 'pass',
      violations: [
        {
          code: 'MIN-002',
          description: 'Minor cleanliness issue in dry storage',
          severity: 'minor',
          corrected: true,
        },
      ],
    },
  ]);

  const yourInspection = inspections.find(i => i.isYours);
  const competitorInspections = inspections.filter(i => !i.isYours);

  const avgCompetitorScore = competitorInspections.reduce((sum, i) => sum + i.score, 0) / competitorInspections.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Regulatory Intelligence</h1>
              <p className="text-gray-600 mt-1">Monitor health inspections and compliance</p>
            </div>
            <Button variant="primary">
              <FileText className="w-4 h-4 mr-2" />
              View Full Report
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
                  <p className="text-sm font-medium text-gray-600">Your Score</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {yourInspection?.score}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Last inspection</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Competitor Avg</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {avgCompetitorScore.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Area average</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Your Advantage</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    +{(yourInspection!.score - avgCompetitorScore).toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">points ahead</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Violations</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {yourInspection?.violations.length || 0}
                  </p>
                  <p className="text-sm text-green-600 mt-1">All corrected</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Latest Inspection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Latest Inspection</CardTitle>
            <CardDescription>
              Inspection from {new Date(yourInspection!.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <p className="text-5xl font-bold text-green-600">{yourInspection?.score}</p>
                    <p className="text-sm text-gray-600 mt-2">Score</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">PASSED</span>
                    </div>
                    <p className="text-gray-600">
                      Excellent compliance with all major health and safety requirements
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Violations Found</h3>
                  {yourInspection?.violations.length === 0 ? (
                    <p className="text-gray-500">No violations found</p>
                  ) : (
                    <div className="space-y-3">
                      {yourInspection?.violations.map((violation, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className={`mt-1 ${
                            violation.severity === 'critical'
                              ? 'text-red-600'
                              : violation.severity === 'major'
                              ? 'text-orange-600'
                              : 'text-yellow-600'
                          }`}>
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{violation.code}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                violation.severity === 'critical'
                                  ? 'bg-red-100 text-red-700'
                                  : violation.severity === 'major'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {violation.severity.toUpperCase()}
                              </span>
                              {violation.corrected && (
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                                  CORRECTED
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{violation.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Inspections */}
        <Card>
          <CardHeader>
            <CardTitle>Competitor Inspection Results</CardTitle>
            <CardDescription>Recent health inspection data for nearby restaurants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {inspection.restaurantName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Inspected on {new Date(inspection.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${
                        inspection.score >= 90
                          ? 'text-green-600'
                          : inspection.score >= 80
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {inspection.score}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {inspection.result === 'pass' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">Passed</span>
                          </>
                        ) : inspection.result === 'conditional' ? (
                          <>
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-600 font-medium">Conditional</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">Failed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {inspection.violations.length} Violation{inspection.violations.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-2">
                      {inspection.violations.map((violation, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm p-2 bg-gray-50 rounded"
                        >
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            violation.severity === 'critical'
                              ? 'bg-red-100 text-red-700'
                              : violation.severity === 'major'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {violation.severity}
                          </span>
                          <span className="text-gray-700">{violation.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Strategic Insights</CardTitle>
            <CardDescription>Competitive advantages from regulatory data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Marketing Opportunity
                    </h4>
                    <p className="text-sm text-green-800">
                      Your score is 17 points higher than Bella Italia. Consider highlighting
                      your perfect health rating in marketing materials to attract health-conscious diners.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Compliance Leadership
                    </h4>
                    <p className="text-sm text-blue-800">
                      You rank #1 in health compliance among nearby competitors. This gives you
                      a significant competitive advantage for corporate catering opportunities.
                    </p>
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
