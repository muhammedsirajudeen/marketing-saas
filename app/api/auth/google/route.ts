import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/application/services/authService';

export async function POST(request: NextRequest) {
    try {
        // Validate content type
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json(
                { error: 'Content-Type must be application/json' },
                { status: 400 }
            );
        }

        // Parse request body with error handling
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        const { userInfo } = body;

        if (!userInfo || !userInfo.email) {
            return NextResponse.json(
                { error: 'Missing user information' },
                { status: 400 }
            );
        }

        // Authenticate user
        const { user, tokens } = await authService.authenticateWithGoogle({
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            sub: userInfo.sub,
        });

        // Return tokens and user data
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
            tokens,
        });

        // No need to set cookie anymore as we are using JWT in response
        // Client side will handle storage (e.g. localStorage)

        return response;
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
}
