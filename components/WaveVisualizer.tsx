import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; // 0-255
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;
    
    const render = () => {
        // Resize logic (could be optimized)
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = canvas.parentElement?.clientHeight || 150;
        
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        if (!isConnected) {
            // Idle state line
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(width, centerY);
            ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
            return;
        }

        // Active visualization
        const baseAmplitude = isSpeaking ? (volume / 255) * (height / 3) : 5;
        const frequency = isSpeaking ? 0.1 : 0.05;
        const speed = isSpeaking ? 0.2 : 0.05;
        
        phase += speed;
        
        // Draw multiple sine waves for effect
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            
            // Color variations based on state
            if (isSpeaking) {
                // Marcus speaking: Professional Blue/Cyan
                ctx.strokeStyle = `rgba(14, 165, 233, ${0.5 + (i * 0.15)})`; 
            } else {
                // Listening: Warm Amber (attention)
                ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + (i * 0.15)})`;
            }
            
            for (let x = 0; x < width; x++) {
                const y = centerY + Math.sin(x * frequency + phase + i) * (baseAmplitude + (i * 5)) * Math.sin(x / width * Math.PI); // Windowing function
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" />;
};
