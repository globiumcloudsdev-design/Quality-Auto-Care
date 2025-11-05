import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real app, you'd check a database
    // For now, we'll just return a mock response
    return NextResponse.json({ claimed: false });
  } catch (error) {
    console.error('Error checking discount claim:', error);
    return NextResponse.json({ claimed: false }, { status: 500 });
  }
}

export async function POST() {
  try {
    // In a real app, you'd update a database
    // For now, we'll just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error claiming discount:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
