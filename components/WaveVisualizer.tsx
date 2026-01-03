
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

        offset += isEmergency ? 10 : 5;
        const midY = h / 2;
        const volScale = (volume / 255);

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

        const primaryColor = isEmergency ? '#ff3333' : '#00ccff';
        const secondaryColor = isEmergency ? '#ffffff' : '#ffffff';
        const baseColor = isEmergency ? '#800000' : '#003366';

        // High frequency noise layer
        drawWave(secondaryColor, 3, 2, 0.5, 0.1, 0.1);
        
        // Dynamic main waves
        drawWave(primaryColor, 1.2, isEmergency ? 30 : 15, 3, 0.9);
        drawWave(secondaryColor, 2, 8, 1, 0.3);
        drawWave(baseColor, 0.8, 20, 6, 0.2);

        // Oscilloscope scanning effect
        if (isSpeaking) {
          const scanX = (offset * 2) % w;
          ctx.beginPath();
          ctx.moveTo(scanX, 0);
          ctx.lineTo(scanX, h);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + volScale * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          const coreGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 150 + volScale * 300);
          coreGrad.addColorStop(0, isEmergency ? 'rgba(255, 51, 51, 0.12)' : 'rgba(0, 204, 255, 0.1)');
          coreGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = coreGrad;
          ctx.fillRect(0, 0, w, h);
        }

        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume, isEmergency]);
  
  return <canvas ref={canvasRef} className="w-full h-full cursor-default" />;
};
