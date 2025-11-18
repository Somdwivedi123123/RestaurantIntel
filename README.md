# Restaurant Intelligence Platform

An extraordinary AI-powered web application that empowers restaurant managers, directors, and leadership with actionable insights, competitive intelligence, and adaptive analytics.

## Overview

The Restaurant Intelligence Platform transforms raw data into strategic business decisions by:

- **Competitive Intelligence**: Real-time tracking of competitor pricing, menus, reviews, and regulatory compliance
- **Dynamic Pricing**: AI-powered menu optimization with projected financial impact
- **Guest Retention**: Churn prediction, customer segmentation, and automated retention strategies
- **AI Strategy Reports**: Auto-generated insights with full transparency and traceability
- **Regulatory Intelligence**: Monitor health inspections, violations, and compliance opportunities
- **Peak Hour Planning**: Forecast busy periods and optimize staffing for maximum efficiency

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **AI/ML**: LangGraph for agent orchestration, Google Gemini API for fast multimodal tasks
- **Backend**: Next.js API Routes, Firebase Functions
- **Database**: Firebase Firestore (NoSQL)
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Deployment**: Firebase Hosting
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Structure

```
RestaurantIntel/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── analyze/         # AI analysis endpoints
│   │   └── reports/         # Report generation
│   ├── dashboard/           # Dashboard pages
│   │   ├── competitive/     # Competitive intelligence UI
│   │   ├── pricing/         # Dynamic pricing optimizer UI
│   │   ├── operations/      # Peak hours & operations UI
│   │   ├── regulatory/      # Regulatory intelligence UI
│   │   ├── retention/       # Guest retention engine UI
│   │   ├── layout.tsx       # Dashboard layout with navigation
│   │   └── page.tsx         # Main dashboard
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx       # Button component
│   │   └── Card.tsx         # Card component
│   └── dashboard/           # Dashboard-specific components
│       ├── DashboardNav.tsx # Navigation sidebar
│       └── MetricCard.tsx   # Metric display card
├── lib/                     # Core libraries
│   ├── ai/                  # AI agents and models
│   │   ├── gemini.ts       # Gemini API integration
│   │   └── langgraph-agents.ts  # AI agent implementations
│   ├── firebase/            # Firebase configuration
│   │   ├── config.ts       # Client-side config
│   │   └── admin.ts        # Server-side admin SDK
│   ├── services/            # Business logic services
│   │   ├── firestore.ts    # Firestore CRUD operations
│   │   └── data-pipeline.ts # Data collection & quality monitoring
│   │   └── firestore.ts    # Firestore CRUD operations
│   ├── types/               # TypeScript type definitions
│   └── utils.ts             # Utility functions
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore indexes
├── storage.rules            # Storage security rules
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.ts       # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- Google Gemini API key
- Firebase project

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd RestaurantIntel
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account@email.com
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase Setup

1. **Login to Firebase**

```bash
firebase login
```

2. **Initialize Firebase in your project**

```bash
firebase init
```

Select:
- Firestore
- Hosting
- Storage

3. **Deploy Firestore rules and indexes**

```bash
firebase deploy --only firestore:rules,firestore:indexes
firebase deploy --only storage
```

## Key Features

### 1. Competitive Intelligence Module (/dashboard/competitive)

Full-featured UI for tracking and analyzing competitor data in real-time:

- **Competitor Overview Table**: Real-time comparison of pricing, ratings, and reviews
- **Strategic Insights**: AI-generated competitive opportunities
- **Price Comparison Trends**: Visual tracking of pricing changes
- **Distance-based Analysis**: Local market intelligence
- **Key Metrics**:
  - Average price tracking
  - Review score monitoring
  - Violation tracking for competitors
  - Distance and market overlap analysis

**API Endpoint**: `POST /api/analyze/competitive`
**Page**: `/dashboard/competitive`

### 2. Dynamic Pricing Optimizer (/dashboard/pricing)

Complete pricing optimization interface with AI recommendations:

- **Pricing Recommendations**: Item-by-item price suggestions
- **Impact Analysis**: Revenue, demand, and profit projections
- **Confidence Scoring**: AI certainty levels for each recommendation
- **One-Click Actions**: Accept or reject pricing changes
- **Strategic Reasoning**: Detailed explanations for each suggestion
- **Key Metrics**:
  - Total potential revenue impact
  - Pending recommendations count
  - Average AI confidence score
  - Segment-based pricing analysis

**API Endpoint**: `POST /api/analyze/pricing`
**Page**: `/dashboard/pricing`

### 3. Operations & Peak Hours (/dashboard/operations)

Advanced operational forecasting and staffing optimization:

- **Hourly Demand Forecast**: 24-hour customer traffic predictions
- **Smart Staffing**: AI-recommended staff levels (waiters, kitchen, host)
- **Table Turnover**: Predicted turnover rates per hour
- **External Factors**: Weather, events, and day-type analysis
- **Visual Demand Indicators**: Color-coded demand levels
- **Key Metrics**:
  - Peak hour identification
  - Maximum staff requirements
  - Average table turnover rate
  - Prediction confidence scores

**API Endpoint**: `POST /api/analyze/operations`
**Page**: `/dashboard/operations`

### 4. Regulatory Intelligence (/dashboard/regulatory)

Health inspection and compliance monitoring:

- **Your Inspection Score**: Track your compliance performance
- **Competitor Inspections**: Monitor nearby restaurant violations
- **Violation Tracking**: Categorized by severity (critical, major, minor)
- **Competitive Advantage**: Identify marketing opportunities from superior compliance
- **Strategic Insights**: Auto-generated compliance recommendations
- **Key Metrics**:
  - Your inspection score
  - Competitor average score
  - Your competitive advantage (points ahead)
  - Violation count and correction status

**Page**: `/dashboard/regulatory`

### 5. Guest Retention Engine (/dashboard/retention)

Churn prediction and automated retention campaigns:

- **Guest Segmentation**: VIP, Regular, Occasional, At-Risk
- **Churn Probability**: AI-predicted risk scores for each guest
- **Lifetime Value**: Customer LTV calculations
- **Retention Strategies**: Personalized campaign recommendations
- **Automated Campaigns**: Win-back, VIP rewards, birthday specials
- **Key Metrics**:
  - Total active guests
  - High-risk guest count
  - Total lifetime value
  - Average churn probability

**Page**: `/dashboard/retention`

### 6. AI Strategy Reports

Comprehensive strategic reports with:

- Executive summaries
- Data-driven insights
- Actionable recommendations
- Financial projections

**API Endpoint**: `POST /api/reports/generate`

## AI Agent Architecture

The platform uses **LangGraph** for sophisticated multi-agent orchestration:

### Agents

1. **CompetitiveIntelligenceAgent**: Analyzes competitor data and provides strategic insights
2. **DynamicPricingAgent**: Optimizes menu pricing based on market conditions
3. **OperationalOptimizationAgent**: Predicts peak hours and staffing needs
4. **RegulatoryIntelligenceAgent**: Monitors compliance and regulatory opportunities
5. **GuestRetentionAgent**: Predicts churn and generates retention strategies
6. **StrategyReportAgent**: Creates comprehensive executive reports

### Example Usage

```typescript
import { CompetitiveIntelligenceAgent } from '@/lib/ai/langgraph-agents';

const agent = new CompetitiveIntelligenceAgent();
const analysis = await agent.analyze(competitorData);
```

## Data Models

Core TypeScript interfaces in `lib/types/index.ts`:

- `Restaurant`: Restaurant profile and metadata
- `MenuItem`: Menu items with pricing and analytics
- `Competitor`: Competitor tracking data
- `PerformanceMetrics`: Business performance KPIs
- `PricingRecommendation`: AI pricing suggestions
- `AIInsight`: Strategic insights and recommendations
- `Guest`: Customer profiles and behavior
- `HealthInspection`: Regulatory compliance data
- `StrategyReport`: Comprehensive strategic reports

## Security

### Authentication

Firebase Authentication with:
- Email/password
- Social providers (Google, Facebook)
- Role-based access control (RBAC)

### Firestore Security Rules

- User-level data isolation
- Restaurant-level access control
- Secure read/write operations
- Validated data structures

### Data Privacy

- GDPR compliant
- DPDP (India) compliant
- CCPA compliant
- PCI DSS compliant (for payment data)
- Encryption at rest and in transit

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### Deploy Everything

```bash
firebase deploy
```

## Development Workflow

1. **Run development server**: `npm run dev`
2. **Type checking**: `npm run type-check`
3. **Linting**: `npm run lint`
4. **Build**: `npm run build`
5. **Production**: `npm start`

## API Documentation

### Competitive Analysis

```typescript
POST /api/analyze/competitive
Content-Type: application/json

{
  "competitorData": [...],
  "restaurantId": "restaurant-123"
}
```

### Pricing Optimization

```typescript
POST /api/analyze/pricing
Content-Type: application/json

{
  "menuData": {...},
  "marketData": {...},
  "historicalData": {...}
}
```

### Operational Predictions

```typescript
POST /api/analyze/operations
Content-Type: application/json

{
  "historicalData": {...},
  "externalFactors": {...}
}
```

### Report Generation

```typescript
POST /api/reports/generate
Content-Type: application/json

{
  "restaurantId": "restaurant-123",
  "data": {...},
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

## Roadmap

### MVP (Current) ✅
- ✅ Core dashboard and metrics
- ✅ AI agent orchestration (5 specialized agents)
- ✅ Firebase integration
- ✅ **Competitive Intelligence page** - Real-time competitor tracking
- ✅ **Dynamic Pricing Optimizer** - AI-powered pricing recommendations
- ✅ **Operations & Peak Hours** - Staffing optimization
- ✅ **Regulatory Intelligence** - Health inspection monitoring
- ✅ **Guest Retention Engine** - Churn prediction & campaigns
- ✅ Navigation system with responsive sidebar
- ✅ Data pipeline infrastructure with quality monitoring
- ✅ Self-healing capabilities (retry logic, auto-correction)

### Phase 2 (In Progress)
- [ ] Firebase Authentication implementation
- [ ] Real-time data synchronization
- [ ] Advanced data scraping pipelines
- [ ] Automated report scheduling
- [ ] Email notification system
- [ ] Mobile PWA optimization
- [ ] Chart visualizations (Recharts integration)

### Phase 3
- [ ] Multi-restaurant management
- [ ] Integration with POS systems (Square, Toast, Clover)
- [ ] Third-party aggregator APIs (Zomato, Swiggy, Uber Eats)
- [ ] Advanced ML models for prediction accuracy
- [ ] API marketplace for extensions
- [ ] White-label solution

## Contributing

This is a proprietary project. For development questions, contact the development team.

## License

Proprietary - All Rights Reserved

## Support

For technical support or questions, please contact:
- Email: support@restaurantintel.ai
- Documentation: [docs.restaurantintel.ai](https://docs.restaurantintel.ai)

---

**Built with ❤️ for the restaurant industry**
