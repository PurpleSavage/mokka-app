export interface WaveConfig {
  amplitude: number;
  frequency: number;
  speed: number;
  opacity: number;
}

export interface Wave {
  freq: number;
  amp: number;
  phase: number;
  color: [number, number, number];
  opacity: number;
  blur: number;
}

export const waveConfig: WaveConfig = {
        amplitude: 150,
        frequency: 0.008,
        speed: 0.02,
        opacity: 0.15
    }

export const waves: Wave[] = [
        { 
            freq: 1.0, 
            amp: 1.0, 
            phase: 0, 
            color: [255, 255, 255], 
            opacity: 0.4,
            blur: 0
        },
        { 
            freq: 1.3, 
            amp: 0.6, 
            phase: Math.PI / 4, 
            color: [199, 0, 14], 
            opacity: 0.2,
            blur: 2
        },
        { 
            freq: 0.7, 
            amp: 0.8, 
            phase: Math.PI / 2, 
            color: [255, 255, 255], 
            opacity: 0.6,
            blur: 4
        }
];