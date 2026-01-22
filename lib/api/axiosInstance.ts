import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach access token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface RefreshTokenResponse {
    success: boolean;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });

    failedQueue = [];
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }

            try {
                const response = await axios.post<RefreshTokenResponse>('/api/auth/refresh', {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;

                localStorage.setItem('accessToken', accessToken);
                // Depending on implementation, refresh token might maintain same or rotate
                if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                }

                api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                processQueue(null, accessToken);

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                // Clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
