import Link from "next/link";
import { ArrowRight, BarChart3, TrendingUp, Users, Shield, Zap, Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Restaurant Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Restaurant with{" "}
            <span className="text-blue-600">Data-Driven Insights</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower your restaurant with competitive intelligence, dynamic pricing,
            and AI-powered analytics to drive revenue and operational excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Restaurant Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay ahead of the competition and optimize your operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
            title="Competitive Intelligence"
            description="Track competitor pricing, menus, reviews, and regulatory compliance in real-time"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="Dynamic Pricing"
            description="AI-powered menu optimization with projected financial impact analysis"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-blue-600" />}
            title="Guest Retention"
            description="Predict churn, segment customers, and automate win-back campaigns"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-blue-600" />}
            title="AI Strategy Reports"
            description="Auto-generated insights and actionable recommendations with full transparency"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-600" />}
            title="Regulatory Intelligence"
            description="Monitor health inspections, violations, and compliance opportunities"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-blue-600" />}
            title="Peak Hour Planning"
            description="Forecast busy periods and optimize staffing for maximum efficiency"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading restaurants using AI-powered insights to drive growth and excellence
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 Restaurant Intelligence Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
