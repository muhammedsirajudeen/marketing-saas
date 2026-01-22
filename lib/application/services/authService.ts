import { userRepository } from '@/lib/infrastructure/repositories/userRepository';
import { CreateUserInput } from '@/lib/domain/entities/User';
import { signToken, signRefreshToken, verifyRefreshToken, getRefreshTokenExpiry } from '@/lib/utils/jwtUtils';

/**
 * Authentication Service
 * Handles user authentication and session management
 */

interface GoogleUserInfo {
    email: string;
    name?: string;
    picture?: string;
    sub: string; // Google user ID
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export class AuthService {
    async authenticateWithGoogle(userInfo: GoogleUserInfo): Promise<{ user: any; tokens: AuthTokens }> {
        // Check if user exists
        let user = await userRepository.findByGoogleId(userInfo.sub);

        if (!user) {
            // Check if user exists with same email
            user = await userRepository.findByEmail(userInfo.email);

            if (user) {
                // Update existing user with Google ID
                user = await userRepository.update(user.id, {
                    name: userInfo.name || user.name,
                    picture: userInfo.picture || user.picture,
                    googleId: userInfo.sub,
                });
            } else {
                // Create new user
                const createInput: CreateUserInput = {
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture,
                    googleId: userInfo.sub,
                };
                user = await userRepository.create(createInput);
            }
        }

        // Generate JWT tokens
        const accessToken = signToken({ userId: user.id, email: user.email });
        const refreshToken = signRefreshToken({ userId: user.id, email: user.email });

        // Store refresh token in database
        await userRepository.update(user.id, {
            refreshToken,
            refreshTokenExpiry: getRefreshTokenExpiry(),
        });

        return {
            user,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<AuthTokens | null> {
        // Verify refresh token
        const payload = verifyRefreshToken(refreshToken);
        if (!payload) {
            return null;
        }

        // Find user and validate stored refresh token
        const user = await userRepository.findById(payload.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return null;
        }

        // Check if refresh token has expired
        if (user.refreshTokenExpiry && new Date() > user.refreshTokenExpiry) {
            return null;
        }

        // Generate new access token
        const accessToken = signToken({ userId: user.id, email: user.email });

        return {
            accessToken,
            refreshToken, // Return the same refresh token
        };
    }

    async getUserById(id: string) {
        return await userRepository.findById(id);
    }
}

export const authService = new AuthService();

