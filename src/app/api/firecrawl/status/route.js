import { NextResponse } from 'next/server';

export function GET() {
  const key = process.env.FIRECRAWL_API_KEY;
  return NextResponse.json({ service: 'Firecrawl Agent API', configured: Boolean(key && key !== 'fc-YOUR_API_KEY'), defaultModel: 'spark-2' });
}
