
import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; 
  isEmergency: boolean;
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume, isEmergency }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let offset = 0;

    const render = () => {
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.moveTo(0, h/2);
            ctx.lineTo(w, h/2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
            return;
        }

        // Ambient movement even if not speaking
        offset += isEmergency ? 8 : 4;
        const midY = h / 2;
        const volScale = isSpeaking ? (volume / 255) : 0.05;

        const drawWave = (color: string, speed: number, amplitude: number, lineWidth: number, opacity: number, frequencyShift: number = 0) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = opacity;
          
          for (let x = 0; x < w; x++) {
            const freq = (isEmergency ? 0.025 : 0.012) + (volScale * 0.04) + frequencyShift;
            const y = midY + Math.sin((x + offset * speed) * freq) * (amplitude + (volScale * 180));
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        };

        const primaryColor = isEmergency ? '#ff3333' : '#3b82f6';
        const secondaryColor = isEmergency ? '#ffffff' : '#ffffff';
        const baseColor = isEmergency ? '#800000' : '#1e3a8a';

        // Noise layer
        drawWave(secondaryColor, 3, 2, 0.5, 0.1, 0.1);
        
        // Dynamic main waves
        drawWave(primaryColor, 1.2, isEmergency ? 30 : 15, 3, 0.8);
        drawWave(secondaryColor, 2, 8, 1, 0.2);
        drawWave(baseColor, 0.8, 20, 6, 0.15);

        // Scanline
        const scanX = (offset * 2) % w;
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, h);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + volScale * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume, isEmergency]);
  
  return <canvas ref={canvasRef} className="w-full h-full cursor-default" />;
};
