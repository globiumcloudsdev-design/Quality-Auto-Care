import { NextRequest, NextResponse } from 'next/server';



/**
 * In-memory store for claimed promo codes.
 * ⚠️ In production, replace this with a database.
 */
const claimedPromos: Set<string> = new Set();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ claimed: false }, { status: 400 });
    }

    const isClaimed = claimedPromos.has(code.toUpperCase());
    return NextResponse.json({ claimed: isClaimed });
  } catch (error) {
    console.error('Error checking discount claim:', error);
    return NextResponse.json({ claimed: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'Promo code required' },
        { status: 400 }
      );
    }

    const upperCode = code.toUpperCase();

    if (claimedPromos.has(upperCode)) {
      return NextResponse.json(
        { success: false, message: 'Promo code already claimed' },
        { status: 400 }
      );
    }

    claimedPromos.add(upperCode);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error claiming discount:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
