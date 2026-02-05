import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { authStore, login, logout } from '~/lib/stores/auth';
import { IconButton } from '~/components/ui/IconButton';
import * as Dialog from '@radix-ui/react-dialog';
import { classNames } from '~/utils/classNames';

export function Auth() {
    const { user, isAuthenticated, isLoading } = useStore(authStore);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, username || email.split('@')[0]);
        setIsOpen(false);
    };

    if (isAuthenticated && user) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-purple-elements-textSecondary hidden sm:inline">
                    {user.username}
                </span>
                <div className="relative group">
                    <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-purple-elements-borderColor cursor-pointer hover:border-purple-elements-item-contentAccent transition-colors"
                        onClick={() => logout()}
                    />
                    <div className="absolute right-0 top-full mt-2 w-max px-2 py-1 bg-purple-elements-background-depth-3 text-purple-elements-textPrimary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Click to logout
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <button className="px-3 py-1.5 text-sm bg-purple-elements-item-backgroundAccent text-purple-elements-item-contentAccent rounded hover:opacity-90 transition-opacity">
                    Login
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-purple-elements-background-depth-2 p-6 rounded-lg shadow-xl border border-purple-elements-borderColor z-50 focus:outline-none">
                    <Dialog.Title className="text-xl font-bold text-purple-elements-textPrimary mb-4">
                        {isLoginMode ? 'Welcome Back' : 'Create Account'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs text-purple-elements-textSecondary mb-1 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-purple-elements-background-depth-1 border border-purple-elements-borderColor rounded p-2 text-purple-elements-textPrimary focus:border-purple-elements-item-contentAccent outline-none"
                                required
                            />
                        </div>

                        {!isLoginMode && (
                            <div>
                                <label className="text-xs text-purple-elements-textSecondary mb-1 block">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-purple-elements-background-depth-1 border border-purple-elements-borderColor rounded p-2 text-purple-elements-textPrimary focus:border-purple-elements-item-contentAccent outline-none"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-purple-elements-textSecondary mb-1 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-purple-elements-background-depth-1 border border-purple-elements-borderColor rounded p-2 text-purple-elements-textPrimary focus:border-purple-elements-item-contentAccent outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 w-full bg-purple-elements-item-contentAccent text-white rounded p-2 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : (isLoginMode ? 'Login' : 'Register')}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-purple-elements-borderColor pt-4">
                        <button
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-elements-background-depth-3 hover:bg-purple-elements-background-depth-4 text-purple-elements-textSecondary hover:text-purple-elements-textPrimary rounded-lg transition-all active:scale-95"
                        >
                            <span>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
                            <span className="font-medium text-purple-elements-item-contentAccent">
                                {isLoginMode ? 'Register' : 'Login'}
                            </span>
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <IconButton className="absolute top-4 right-4" icon="i-ph:x" />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
