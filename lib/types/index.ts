/**
 * Core data types for Restaurant Intelligence Platform
 */

// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  city: string;
  country: string;
  cuisine: string[];
  priceRange: 1 | 2 | 3 | 4; // $ to $$$$
  capacity: number;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'manager' | 'director' | 'admin';
  restaurantIds: string[];
  photoURL?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Menu types
export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost?: number; // Cost to make
  ingredients?: string[];
  allergens?: string[];
  imageUrl?: string;
  isAvailable: boolean;
  popularity?: number; // 0-100
  profitMargin?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Competitor types
export interface Competitor {
  id: string;
  restaurantId: string; // The restaurant tracking this competitor
  name: string;
  address: string;
  city: string;
  cuisine: string[];
  priceRange: 1 | 2 | 3 | 4;
  distance?: number; // km from your restaurant
  lastScraped?: Date;
  dataSource: 'manual' | 'zomato' | 'swiggy' | 'google' | 'yelp' | 'tripadvisor';
  sourceId?: string;
  createdAt: Date;
}

export interface CompetitorSnapshot {
  id: string;
  competitorId: string;
  timestamp: Date;
  menuItems?: MenuItem[];
  averagePrice?: number;
  reviewScore?: number;
  reviewCount?: number;
  popularDishes?: string[];
  promotions?: string[];
}

// Analytics types
export interface PerformanceMetrics {
  restaurantId: string;
  date: Date;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  tableOccupancy: number; // percentage
  turnoverRate: number; // tables per hour
  customerCount: number;
  newCustomers: number;
  returningCustomers: number;
}

// Pricing types
export interface PricingRecommendation {
  id: string;
  restaurantId: string;
  menuItemId: string;
  currentPrice: number;
  recommendedPrice: number;
  projectedImpact: {
    revenueChange: number; // percentage
    demandChange: number; // percentage
    profitChange: number; // absolute value
  };
  reasoning: string;
  confidence: number; // 0-1
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'applied';
}

// Regulatory types
export interface HealthInspection {
  id: string;
  restaurantId?: string;
  competitorId?: string;
  inspectionDate: Date;
  score?: number;
  violations: Violation[];
  result: 'pass' | 'conditional' | 'fail';
  dataSource: string;
  sourceUrl?: string;
}

export interface Violation {
  code: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  corrected: boolean;
}

// Guest/Customer types
export interface Guest {
  id: string;
  restaurantId: string;
  email?: string;
  phone?: string;
  name?: string;
  firstVisit: Date;
  lastVisit: Date;
  visitCount: number;
  totalSpent: number;
  averageSpent: number;
  favoriteItems?: string[];
  preferredTimes?: string[]; // e.g., ["dinner", "weekend"]
  churnProbability?: number; // 0-1
  segment?: string;
  tags?: string[];
}

export interface GuestVisit {
  id: string;
  guestId: string;
  restaurantId: string;
  visitDate: Date;
  orderValue: number;
  items: string[];
  partySize: number;
  tableNumber?: string;
  satisfaction?: number; // 1-5
  notes?: string;
}

// Operational types
export interface PeakHourPrediction {
  restaurantId: string;
  date: Date;
  hour: number;
  predictedDemand: number; // number of customers
  confidence: number; // 0-1
  recommendedStaffing: {
    waiters: number;
    kitchen: number;
    host: number;
  };
  expectedTurnover: number; // tables per hour
  factors: string[]; // e.g., ["weekend", "local_event", "good_weather"]
}

// AI Insights types
export interface AIInsight {
  id: string;
  restaurantId: string;
  type: 'pricing' | 'competitive' | 'operational' | 'regulatory' | 'retention';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  priority: number; // 1-10
  recommendations: string[];
  dataPoints: Record<string, any>;
  createdAt: Date;
  acknowledged: boolean;
  implementedAt?: Date;
}

export interface StrategyReport {
  id: string;
  restaurantId: string;
  title: string;
  period: {
    start: Date;
    end: Date;
  };
  executiveSummary: string;
  sections: ReportSection[];
  recommendations: Recommendation[];
  projectedImpact: {
    revenue: number;
    costs: number;
    netBenefit: number;
  };
  createdAt: Date;
  generatedBy: 'ai' | 'user';
  status: 'draft' | 'final' | 'archived';
}

export interface ReportSection {
  title: string;
  content: string;
  charts?: ChartData[];
  insights: string[];
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'heatmap' | 'scatter';
  title: string;
  data: any[];
  config?: Record<string, any>;
}

export interface Recommendation {
  title: string;
  description: string;
  category: 'pricing' | 'menu' | 'operations' | 'marketing' | 'compliance';
  impact: {
    revenue?: number;
    cost?: number;
    efficiency?: number; // percentage
  };
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  actionSteps: string[];
}

// Data pipeline types
export interface DataPipelineJob {
  id: string;
  type: 'scrape' | 'analysis' | 'prediction' | 'report';
  status: 'pending' | 'running' | 'completed' | 'failed';
  restaurantId: string;
  config: Record<string, any>;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  result?: any;
  metadata: {
    retryCount: number;
    lastRetry?: Date;
    logs: string[];
  };
}

export interface DataQualityMetrics {
  restaurantId: string;
  timestamp: Date;
  completeness: number; // 0-100
  accuracy: number; // 0-100
  freshness: number; // hours since last update
  consistency: number; // 0-100
  issues: string[];
}
