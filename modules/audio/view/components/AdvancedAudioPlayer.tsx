'use client'

import { useState, useCallback } from 'react'
import { FaPlay, FaPause, FaVolumeHigh } from 'react-icons/fa6'
import { RxLoop } from 'react-icons/rx'
import { useWaveSurfer } from '../utils/hooks/useWaveSurfer'
import { FaVolumeMute } from 'react-icons/fa'

export interface AdvancedAudioPlayerProps {
  /** URL del archivo de audio */
  url: string
  /** Título del audio */
  title?: string
  /** Descripción del audio */
  description?: string
  /** Altura del waveform */
  height?: number
  /** Color del waveform */
  waveColor?: string
  /** Color de progresión */
  progressColor?: string
  /** Mostrar controles avanzados */
  showAdvancedControls?: boolean
  /** Callback cuando termina */
  onEnded?: () => void
  /** Callback en error */
  onError?: (error: Error) => void
  /** Clase CSS personalizada */
  className?: string
}

/**
 * Componente AudioPlayer avanzado con controles adicionales
 * Incluye: volumen, velocidad de reproducción, loop, y más
 */
export default function AdvancedAudioPlayer({
  url,
  title,
  description,
  height = 60,
  waveColor = '#9F7AEA',
  progressColor = '#6D28D9',
  showAdvancedControls = true,
  onEnded,
  onError,
  className = ''
}: AdvancedAudioPlayerProps) {
  const {
    containerRef,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    playPause,
    setVolume,
    setPlaybackRate,
    seek
  } = useWaveSurfer({
    url,
    height,
    waveColor,
    progressColor,
    initialVolume: 0.7,
    playbackRate: 1,
    onFinish: onEnded,
    onError: onError
  })

  const [volume, setVolumeState] = useState(0.7)
  const [playbackRate, setPlaybackRateState] = useState(1)
  const [isLoop, setIsLoop] = useState(false)

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value)
      setVolumeState(newVolume)
      setVolume(newVolume)
    },
    [setVolume]
  )

  const handlePlaybackRateChange = useCallback(
    (rate: number) => {
      setPlaybackRateState(rate)
      setPlaybackRate(rate)
    },
    [setPlaybackRate]
  )

  const handleLoop = useCallback(() => {
    setIsLoop(!isLoop)
  }, [isLoop])

  const formatTime = useCallback((seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={`rounded-xl bg-linear-to-b from-[#2d1b4e] to-[#1a0f2e] p-6 space-y-4 shadow-lg border border-purple-600/30 ${className}`}>
      {/* Encabezado */}
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      )}

      {/* Controles principales */}
      <div className="flex items-center gap-4">
        {/* Botón Play/Pause */}
        <button
          onClick={playPause}
          disabled={isLoading}
          className="shrink-0 p-4 rounded-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
        >
          {isLoading ? (
            <div className="animate-spin">
              <div className="size-6 border-2 border-white border-t-transparent rounded-full" />
            </div>
          ) : isPlaying ? (
            <FaPause size={24} color="white" />
          ) : (
            <FaPlay size={24} color="white" style={{ marginLeft: '3px' }} />
          )}
        </button>

        {/* Waveform */}
        <div className="flex-1">
          <div
            ref={containerRef}
            className="w-full rounded-lg overflow-hidden"
            style={{ minHeight: `${height}px` }}
          />
        </div>
      </div>

      {/* Tiempo y progreso */}
      {duration > 0 && (
        <div className="space-y-2">
          {/* Barra de progreso */}
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-600"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${progressPercent}%, #374151 ${progressPercent}%, #374151 100%)`
            }}
          />
          
          {/* Tiempo actual y duración */}
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Controles avanzados */}
      {showAdvancedControls && (
        <div className="flex items-center justify-between pt-2 border-t border-purple-600/20">
          {/* Volumen */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            {volume > 0 ? (
              <FaVolumeHigh size={16} className="text-gray-400 shrink-0" />
            ) : (
              <FaVolumeMute size={16} className="text-gray-400 shrink-0" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-xs text-gray-400 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Velocidad de reproducción */}
          <div className="flex items-center gap-1 ml-4">
            <span className="text-xs text-gray-400 w-8">Vel:</span>
            {[0.75, 1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                  playbackRate === rate
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Loop */}
          <button
            onClick={handleLoop}
            className={`ml-4 p-2 rounded-lg transition-colors ${
              isLoop
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            title={isLoop ? 'Loop activado' : 'Activar loop'}
          >
            <RxLoop size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
