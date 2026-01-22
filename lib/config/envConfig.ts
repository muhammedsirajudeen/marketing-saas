/**
 * Environment Configuration
 * Type-safe environment variable loader with validation
 */

interface EnvConfig {
    database: {
        url: string;
    };
    auth: {
        google: {
            clientId: string;
            clientSecret: string;
        };
        jwt: {
            secret: string;
            refreshSecret: string;
        };
    };
    app: {
        nodeEnv: string;
    };
}

function getEnvVar(key: string, required: boolean = true): string {
    const value = process.env[key];

    if (!value && required) {
        throw new Error(
            `Missing required environment variable: ${key}\n` +
            `Please ensure ${key} is set in your .env file.\n` +
            `See .env.example for reference.`
        );
    }

    return value || '';
}

// Server-side only configuration
function getServerConfig(): EnvConfig {
    return {
        database: {
            url: getEnvVar('DATABASE_URL'),
        },
        auth: {
            google: {
                clientId: getEnvVar('GOOGLE_CLIENT_ID'),
                clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
            },
            jwt: {
                secret: getEnvVar('JWT_SECRET'),
                refreshSecret: getEnvVar('JWT_REFRESH_SECRET'),
            },
        },
        app: {
            nodeEnv: getEnvVar('NODE_ENV', false) || 'development',
        },
    };
}

// Client-safe configuration (only non-sensitive values)
function getClientConfig(): EnvConfig {
    return {
        database: {
            url: '', // Never expose on client
        },
        auth: {
            google: {
                clientId: getEnvVar('NEXT_PUBLIC_GOOGLE_CLIENT_ID', false) || '',
                clientSecret: '', // Never expose on client
            },
            jwt: {
                secret: '', // Never expose on client
                refreshSecret: '', // Never expose on client
            },
        },
        app: {
            nodeEnv: getEnvVar('NODE_ENV', false) || 'development',
        },
    };
}

export const envConfig: EnvConfig =
    typeof window === 'undefined' ? getServerConfig() : getClientConfig();

// Validate configuration on import (server-side only)
if (typeof window === 'undefined') {
    console.log('✅ Environment configuration loaded successfully');
}
