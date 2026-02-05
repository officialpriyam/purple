import { map } from 'nanostores';

export interface User {
    username: string;
    email: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const authStore = map<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
});

export function login(email: string, username: string) {
    authStore.setKey('isLoading', true);
    // Simulate API call
    setTimeout(() => {
        authStore.set({
            user: { email, username, avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}` },
            isAuthenticated: true,
            isLoading: false,
        });
    }, 1000);
}

export function logout() {
    authStore.set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });
}
