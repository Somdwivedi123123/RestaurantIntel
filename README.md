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
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard-specific components
├── lib/                     # Core libraries
│   ├── ai/                  # AI agents and models
│   │   ├── gemini.ts       # Gemini API integration
│   │   └── langgraph-agents.ts  # LangGraph agent orchestration
│   ├── firebase/            # Firebase configuration
│   │   ├── config.ts       # Client-side config
│   │   └── admin.ts        # Server-side admin SDK
│   ├── services/            # Business logic services
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

### 1. Competitive Intelligence Module

Track and analyze competitor data in real-time:

- Menu pricing comparisons
- Review scores and sentiment
- Regulatory compliance tracking
- Automated competitive benchmarking

**API Endpoint**: `POST /api/analyze/competitive`

### 2. Dynamic Pricing Optimizer

AI-powered pricing recommendations:

- Demand elasticity analysis
- Competitor pricing intelligence
- Profit margin optimization
- Revenue impact projections

**API Endpoint**: `POST /api/analyze/pricing`

### 3. Operational Optimization

Predict and optimize daily operations:

- Peak hour forecasting
- Table turnover analysis
- Staff scheduling recommendations
- Capacity planning

**API Endpoint**: `POST /api/analyze/operations`

### 4. AI Strategy Reports

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

### MVP (Current)
- ✅ Core dashboard and metrics
- ✅ AI agent orchestration
- ✅ Firebase integration
- ✅ Basic competitive intelligence
- ✅ Pricing recommendations
- ✅ Operational predictions

### Phase 2
- [ ] Advanced data scraping pipelines
- [ ] Real-time competitive monitoring
- [ ] Guest retention campaigns
- [ ] Automated report scheduling
- [ ] Mobile-responsive PWA

### Phase 3
- [ ] Self-healing data pipelines
- [ ] Multi-restaurant management
- [ ] Advanced analytics dashboards
- [ ] Integration with POS systems
- [ ] API marketplace for third-party integrations

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
