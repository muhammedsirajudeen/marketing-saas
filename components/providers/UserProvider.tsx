'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name?: string;
    picture?: string;
}

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    login: (tokens: AuthTokens, userData: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const storedTokens = localStorage.getItem('auth_tokens');
            if (storedTokens) {
                try {
                    const { accessToken } = JSON.parse(storedTokens);
                    const response = await fetch('/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                    } else {
                        // Token invalid/expired - try refresh flow or logout
                        // For now, simpler auto-logout
                        logout();
                    }
                } catch (error) {
                    console.error('Auth initialization failed:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (tokens: AuthTokens, userData: User) => {
        localStorage.setItem('auth_tokens', JSON.stringify(tokens));
        setUser(userData);
        router.refresh();
    };

    const logout = () => {
        localStorage.removeItem('auth_tokens');
        setUser(null);
        router.push('/login');
        router.refresh();
    };

    return (
        <UserContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
