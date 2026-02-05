import { useEffect, useRef } from 'react';

export function TorchEffect() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const x = e.clientX;
            const y = e.clientY;
            containerRef.current.style.setProperty('--cursor-x', `${x}px`);
            containerRef.current.style.setProperty('--cursor-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Dust Particles Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
        }> = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particleCount = 50; // Number of dust particles
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.2, // Very slow float
                    speedY: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 255, ${p.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        createParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
            {/* Top Spotlight/Torch */}
            <div
                className="absolute top-[-50vh] left-1/2 -translate-x-1/2 w-[100vh] h-[150vh] opacity-30 blur-[100px] pointer-events-none"
                style={{
                    background: 'conic-gradient(from 180deg at 50% 0%, transparent 45%, rgba(138, 43, 226, 0.3) 50%, transparent 55%)',
                    transformOrigin: '50% 0%',
                }}
            />

            {/* Ambient Purple Haze */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            {/* Mist/Fog Animation Layer */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            {/* Dust Particles Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

            {/* Optional: Interactive Spotlight tracking mouse (classic torch effect) */}
            <div
                ref={containerRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none mix-blend-screen opacity-10"
                style={{
                    background: 'radial-gradient(circle 600px at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(147, 51, 234, 0.15), transparent 80%)',
                }}
            />
        </div>
    );
}
