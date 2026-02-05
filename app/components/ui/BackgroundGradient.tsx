import { memo } from 'react';

export const BackgroundGradient = memo(() => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 50% 0%, rgba(147, 51, 234, 0.1) 0%, rgba(0, 0, 0, 0) 50%),
                    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%),
                    linear-gradient(180deg, rgba(5, 5, 5, 0) 0%, rgba(5, 5, 5, 1) 100%)
                `
                }}
            />
        </div>
    );
});
