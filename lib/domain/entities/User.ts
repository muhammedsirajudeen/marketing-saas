/**
 * User Entity
 * Domain model representing a user in the system
 */

export interface User {
    id: string;
    email: string;
    name: string | null;
    picture: string | null;
    googleId: string | null;
    refreshToken?: string | null;
    refreshTokenExpiry?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserInput {
    email: string;
    name?: string | null;
    picture?: string | null;
    googleId?: string | null;
}

export interface UpdateUserInput {
    name?: string | null;
    picture?: string | null;
    googleId?: string | null;
    refreshToken?: string | null;
    refreshTokenExpiry?: Date | null;
}
