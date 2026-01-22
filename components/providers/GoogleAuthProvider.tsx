'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
    // Access NEXT_PUBLIC env var directly on client side
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

    // If no client ID is configured, show a message instead of crashing
    if (!clientId || clientId === 'your-google-client-id') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
                <div className="max-w-md text-center space-y-4">
                    <div className="text-4xl">🔑</div>
                    <h2 className="text-2xl font-bold">Google OAuth Not Configured</h2>
                    <p className="text-muted-foreground">
                        Please set up your Google OAuth credentials to enable login.
                    </p>
                    <div className="bg-muted p-4 rounded-lg text-left text-sm space-y-2">
                        <p className="font-semibold">Steps to configure:</p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                            <li>Go to Google Cloud Console</li>
                            <li>Create OAuth 2.0 credentials</li>
                            <li>Add credentials to .env file</li>
                            <li>Restart the dev server</li>
                        </ol>
                    </div>
                    <a
                        href="/"
                        className="inline-block text-primary hover:underline"
                    >
                        ← Back to home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}
