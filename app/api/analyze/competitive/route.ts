import { NextRequest, NextResponse } from 'next/server';
import { CompetitiveIntelligenceAgent } from '@/lib/ai/langgraph-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { competitorData, restaurantId } = body;

    if (!competitorData || !restaurantId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize the competitive intelligence agent
    const agent = new CompetitiveIntelligenceAgent();

    // Run the analysis
    const analysis = await agent.analyze(competitorData);

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Competitive analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
