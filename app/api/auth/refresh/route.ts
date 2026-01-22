import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/application/services/authService';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token is required' },
                { status: 400 }
            );
        }

        const tokens = await authService.refreshAccessToken(refreshToken);

        if (!tokens) {
            return NextResponse.json(
                { error: 'Invalid or expired refresh token' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            tokens,
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
