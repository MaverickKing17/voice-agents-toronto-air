
import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; 
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
        const w = canvas.parentElement?.clientWidth || 300;
        const h = canvas.parentElement?.clientHeight || 300;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        
        const centerX = w / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(w, h) * 0.28;
        const volScale = (volume / 255);
        
        ctx.clearRect(0, 0, w, h);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.setLineDash([4, 12]);
            ctx.lineWidth = 1;
            ctx.stroke();
            return;
        }

        phase += isSpeaking ? 0.03 + volScale * 0.1 : 0.005;

        // Render 5 layered organic waves
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.setLineDash([]);
          const r = baseRadius + (i * 12) + (isSpeaking ? volScale * 50 : 0);
          
          for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
            const freq = (i + 1) * 2;
            const distortion = Math.sin(angle * freq + phase * (1 + i * 0.2)) * (isSpeaking ? volScale * 40 : 3);
            const x = centerX + Math.cos(angle) * (r + distortion);
            const y = centerY + Math.sin(angle) * (r + distortion) * 0.8; 
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          
          const opacity = isSpeaking 
            ? Math.max(0.1, (1 - i * 0.2) * (volScale * 2))
            : (0.1 - i * 0.02);
            
          ctx.strokeStyle = isSpeaking 
            ? `rgba(59, 130, 246, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Inner Power Core
        const coreR = 12 + (isSpeaking ? volScale * 40 : 2);
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreR * 2.5);
        
        if (isSpeaking) {
          coreGrad.addColorStop(0, '#fff');
          coreGrad.addColorStop(0.2, 'rgba(59, 130, 246, 0.8)');
          coreGrad.addColorStop(1, 'transparent');
        } else {
          coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
          coreGrad.addColorStop(1, 'transparent');
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreR * 3, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};
