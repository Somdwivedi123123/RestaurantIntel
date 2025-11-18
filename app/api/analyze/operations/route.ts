import { NextRequest, NextResponse } from 'next/server';
import { OperationalOptimizationAgent } from '@/lib/ai/langgraph-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { historicalData, externalFactors } = body;

    if (!historicalData) {
      return NextResponse.json(
        { error: 'Missing historical data' },
        { status: 400 }
      );
    }

    // Initialize the operational optimization agent
    const agent = new OperationalOptimizationAgent();

    // Run peak hour prediction
    const predictions = await agent.predictPeakHours(
      historicalData,
      externalFactors || {}
    );

    return NextResponse.json({
      success: true,
      predictions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Operational analysis error:', error);
    return NextResponse.json(
      { error: 'Operational analysis failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
