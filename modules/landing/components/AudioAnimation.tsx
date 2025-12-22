'use client'
import { IoIosPause } from "react-icons/io";
import { BsChatLeftText } from "react-icons/bs";
import {useEffect, useRef } from "react";
import { Wave, waveConfig, waves } from "../const/audio-animation";


export default function AudioAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)
  const animateRef = useRef<(() => void) | null>(null)
  
  const setupCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawWave = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, wave: Wave): void => {
    const { freq, amp, phase, color, opacity, blur } = wave;
    const centerY = canvas.height / 2;
    const width = canvas.width;
    
    ctx.save();
    
    // Aplicar blur sutil
    if (blur > 0) {
      ctx.filter = `blur(${blur}px)`;
    }
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    
    // Crear gradiente horizontal muy sutil
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
    gradient.addColorStop(0.3, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`);
    gradient.addColorStop(0.7, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
    
    ctx.strokeStyle = gradient;
    
    // Dibujar onda muy sutil
    for (let x = 0; x < width; x += 3) {
      const waveValue = Math.sin(
        (x * waveConfig.frequency * freq) + 
        (timeRef.current * waveConfig.speed) + 
        phase
      );
      
      // Modulación muy suave
      const modulation = Math.sin(timeRef.current * 0.01 + phase) * 0.2 + 0.8;
      
      const y = centerY + (waveValue * waveConfig.amplitude * amp * modulation);
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    ctx.restore();
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
    const particleCount = 8;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const x = (i / particleCount) * canvas.width;
      const waveY = centerY + Math.sin(
        (x * waveConfig.frequency) + 
        (timeRef.current * waveConfig.speed)
      ) * waveConfig.amplitude;
      
      const opacity = (Math.sin(timeRef.current * 0.02 + i * 0.8) * 0.5 + 0.5) * 0.1;
      
      // Partículas muy sutiles
      const gradient = ctx.createRadialGradient(x, waveY, 0, x, waveY, 20);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, waveY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    // Definir la función animate dentro del useEffect
    animateRef.current = (): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        drawWave(ctx, canvas, wave);
      });

      drawParticles(ctx, canvas);

      timeRef.current += 1;
      animationRef.current = requestAnimationFrame(() => {
        animateRef.current?.();
      });
    };

    setupCanvas();
    
    const handleResize = () => {
      setupCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Iniciar la animación
    animationRef.current = requestAnimationFrame(() => {
      animateRef.current?.();
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Array vacío porque todo está dentro del useEffect

  return (
    <section className="mt-20 space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl text-white font-bold text-center">Customize Your Audio</h2>
        <p className="text-center text-white text-2xl w-2/3 mx-auto">
          Create your own audio from text and bring your message to life with unique voice styles and tones.
        </p>
      </div>
      <div>
        <div className="bg-[#1c1c1c] rounded-lg w-1/3 border border-gray-800/50 mx-auto p-8 space-y-4">
          <div className="space-y-2">
            <p className="text-xl text-gray-200 font-medium text-center">Advertisement for Beverages</p>
            <p className="text-gray-400 text-lg text-center">julio 29, 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-400">00:27:12</p>
            <div className="grow h-2 rounded-full bg-[#2c2c2c] relative">
              <div className="size-2 rounded-full bg-amber-700 absolute right-20"></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="px-4 py-1 rounded-full border border-gray-600/50 flex gap-2 items-center">
              <BsChatLeftText size={12} color="white"/>
              <p className="text-gray-400">prompt</p>
            </div>
            <div className="grow justify-center flex items-center">
              <IoIosPause size={40} color="white"/>
            </div>
            <p className="text-[#92400E] border border-[#e07430] bg-[#FEF3C7] px-3 text-sm rounded-full">Kevin voice model</p>
          </div>
        </div>
      </div>
      <div style={{ 
        position: 'relative',  
        height: '150px', 
        overflow: 'hidden'
      }}
       className="overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6
          }}
        />
      </div>
    </section>
  )
}