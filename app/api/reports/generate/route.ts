import { NextRequest, NextResponse } from 'next/server';
import { StrategyReportAgent } from '@/lib/ai/langgraph-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { restaurantId, data, period } = body;

    if (!restaurantId || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize the strategy report agent
    const agent = new StrategyReportAgent();

    // Generate comprehensive report
    const report = await agent.generateReport({
      restaurantId,
      period: period || {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
      ...data,
    });

    return NextResponse.json({
      success: true,
      report,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Report generation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
