import { NextRequest, NextResponse } from 'next/server';
import { DynamicPricingAgent } from '@/lib/ai/langgraph-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { menuData, marketData, historicalData } = body;

    if (!menuData || !marketData || !historicalData) {
      return NextResponse.json(
        { error: 'Missing required data for pricing analysis' },
        { status: 400 }
      );
    }

    // Initialize the dynamic pricing agent
    const agent = new DynamicPricingAgent();

    // Run pricing optimization
    const recommendations = await agent.optimizePricing(
      menuData,
      marketData,
      historicalData
    );

    return NextResponse.json({
      success: true,
      recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Pricing analysis error:', error);
    return NextResponse.json(
      { error: 'Pricing analysis failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
