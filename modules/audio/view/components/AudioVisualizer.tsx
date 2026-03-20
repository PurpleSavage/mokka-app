'use client'

import { useRef, useEffect, useState, useCallback, useId } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { FaPlay, FaPause } from 'react-icons/fa6'
import AudioVisualizerSkeleton from '../skeletons/AudioVisualizerSkeleton'

type AudioVisualizerPlayEventDetail = {
  group: string
  playerId: string
}

const AUDIO_VISUALIZER_PLAY_EVENT = 'audio-visualizer:play'

export interface AudioVisualizerProps {
  /** URL del archivo de audio */
  url: string
  /** Altura del waveform en píxeles */
  height?: number
  /** Color del waveform */
  waveColor?: string
  /** Color de progresión */
  progressColor?: string
  /** Callback cuando el audio termina */
  onEnded?: () => void
  /** Callback cuando hay un error */
  onError?: (error: Error) => void
  /** Mostrar controles de play/pause */
  showControls?: boolean
  /** Volumen inicial (0-1) */
  initialVolume?: number
  /** Velocidad inicial de reproducción */
  playbackRate?: number
  /** Inicio de reproducción (porcentaje del audio total) */
  playbackStartPercent?: number
  /** Fin de reproducción (porcentaje del audio total) */
  playbackEndPercent?: number
  /** Fade in dentro del tramo seleccionado (porcentaje del tramo) */
  fadeInPercent?: number
  /** Fade out dentro del tramo seleccionado (porcentaje del tramo) */
  fadeOutPercent?: number
  /** Grupo para reproducción exclusiva (solo 1 audio reproduciendo por grupo) */
  exclusiveGroup?: string
  /** Mostrar skeleton mientras carga el audio */
  showSkeleton?: boolean
  /** Clase CSS personalizada */
  className?: string
}

export default function AudioVisualizer({
  url,
  height = 60,
  waveColor = '#9D174D',
  progressColor = '#9D174D',
  onEnded,
  onError,
  showControls = true,
  initialVolume = 0.5,
  playbackRate = 1,
  playbackStartPercent = 0,
  playbackEndPercent = 100,
  fadeInPercent = 0,
  fadeOutPercent = 0,
  exclusiveGroup = 'global-audio',
  showSkeleton = true,
  className = ''
}: AudioVisualizerProps) {
  const reactId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const waveformRef = useRef<WaveSurfer | null>(null)
  const playerIdRef = useRef(`audio-viz-${reactId}`)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const idleColor = '#FFFFFF'
  const startPercentRef = useRef(playbackStartPercent)
  const endPercentRef = useRef(playbackEndPercent)
  const fadeInPercentRef = useRef(fadeInPercent)
  const fadeOutPercentRef = useRef(fadeOutPercent)

  useEffect(() => {
    startPercentRef.current = playbackStartPercent
    endPercentRef.current = playbackEndPercent
    fadeInPercentRef.current = fadeInPercent
    fadeOutPercentRef.current = fadeOutPercent
  }, [playbackStartPercent, playbackEndPercent, fadeInPercent, fadeOutPercent])

  // Inicializar Wavesurfer
  useEffect(() => {
    if (!containerRef.current || !url) return

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: idleColor,
      progressColor: idleColor,
      height,
      cursorColor: 'transparent',
      barGap: 3,
      barHeight: 1.5,
      barRadius: 3,
      barMinHeight: 1,
      dragToSeek: true,
      hideScrollbar: true,
      media: new Audio(),
      autoplay: false,
      interact: true,
      url
    })

    // Establecer volumen inicial
    ws.setVolume(initialVolume)
    
    // Establecer velocidad de reproducción
    ws.getMediaElement().playbackRate = playbackRate

    waveformRef.current = ws

    // Event listeners
    ws.on('ready', () => {
      setIsLoading(false)
      setIsPlaying(false)
    })

    ws.on('play', () => {
      const duration = ws.getDuration()
      if (duration > 0) {
        const clampedStart = Math.max(0, Math.min(99, startPercentRef.current))
        const clampedEnd = Math.max(clampedStart + 1, Math.min(100, endPercentRef.current))
        const startSeconds = (duration * clampedStart) / 100
        const endSeconds = (duration * clampedEnd) / 100
        const currentTime = ws.getCurrentTime()

        if (currentTime < startSeconds || currentTime >= endSeconds) {
          ws.seekTo(startSeconds / duration)
        }
      }

      setIsPlaying(true)
    })

    ws.on('pause', () => {
      setIsPlaying(false)
      ws.setVolume(initialVolume)
    })

    ws.on('timeupdate', () => {
      const duration = ws.getDuration()
      if (duration <= 0) return

      const clampedStart = Math.max(0, Math.min(99, startPercentRef.current))
      const clampedEnd = Math.max(clampedStart + 1, Math.min(100, endPercentRef.current))
      const startSeconds = (duration * clampedStart) / 100
      const endSeconds = (duration * clampedEnd) / 100
      const currentTime = ws.getCurrentTime()

      if (currentTime >= endSeconds) {
        ws.pause()
        ws.seekTo(startSeconds / duration)
        return
      }

      let volumeFactor = 1
      const selectedSegment = Math.max(0.001, endSeconds - startSeconds)
      const fadeInSeconds = selectedSegment * (Math.max(0, Math.min(100, fadeInPercentRef.current)) / 100)
      const fadeOutSeconds = selectedSegment * (Math.max(0, Math.min(100, fadeOutPercentRef.current)) / 100)

      if (fadeInSeconds > 0 && currentTime < startSeconds + fadeInSeconds) {
        volumeFactor = Math.min(volumeFactor, Math.max(0, (currentTime - startSeconds) / fadeInSeconds))
      }

      if (fadeOutSeconds > 0 && currentTime > endSeconds - fadeOutSeconds) {
        volumeFactor = Math.min(volumeFactor, Math.max(0, (endSeconds - currentTime) / fadeOutSeconds))
      }

      ws.setVolume(initialVolume * volumeFactor)
    })

    ws.on('finish', () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    })

    ws.on('error', (error: Error) => {
      console.error('WaveSurfer error:', error)
      if (onError) onError(error)
    })

    ws.on('loading', (percent: number) => {
      setIsLoading(percent < 100)
    })

    return () => {
      ws.destroy()
    }
  }, [url, height, waveColor, progressColor, onEnded, onError, initialVolume, playbackRate])

  useEffect(() => {
    if (!waveformRef.current) return

    waveformRef.current.setOptions({
      waveColor: isPlaying ? waveColor : idleColor,
      progressColor: isPlaying ? progressColor : idleColor
    })
  }, [isPlaying, waveColor, progressColor])

  useEffect(() => {
    const onOtherAudioPlay = (event: Event) => {
      const customEvent = event as CustomEvent<AudioVisualizerPlayEventDetail>
      const detail = customEvent.detail

      if (!detail || detail.group !== exclusiveGroup) return
      if (detail.playerId === playerIdRef.current) return

      if (waveformRef.current?.isPlaying()) {
        waveformRef.current.pause()
      }
    }

    window.addEventListener(AUDIO_VISUALIZER_PLAY_EVENT, onOtherAudioPlay as EventListener)

    return () => {
      window.removeEventListener(AUDIO_VISUALIZER_PLAY_EVENT, onOtherAudioPlay as EventListener)
    }
  }, [exclusiveGroup])

  const handlePlayPause = useCallback(() => {
    if (!waveformRef.current) return

    if (!waveformRef.current.isPlaying()) {
      window.dispatchEvent(
        new CustomEvent<AudioVisualizerPlayEventDetail>(AUDIO_VISUALIZER_PLAY_EVENT, {
          detail: {
            group: exclusiveGroup,
            playerId: playerIdRef.current
          }
        })
      )
    }

    waveformRef.current.playPause()
  }, [exclusiveGroup])

  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Controles */}
        {showControls && (
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="cursor-pointer shrink-0 p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            style={{
              color: isPlaying ? '#9D174D' : '#FFFFFF',
              // borderColor: isPlaying ? '#9D174D' : '#FFFFFF'
            }}
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isLoading ? (
              <div className="animate-spin">
                <div className="size-5 border-2 border-current border-t-transparent rounded-full" />
              </div>
            ) : isPlaying ? (
              <FaPause size={14} color="currentColor" />
            ) : (
              <FaPlay size={14} color="currentColor" style={{ marginLeft: '2px' }} />
            )}
          </button>
        )}

        {/* Waveform */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="relative w-full rounded-lg overflow-hidden" style={{ minHeight: `${height}px` }}>
            <div
              ref={containerRef}
              className="w-full rounded-lg overflow-hidden"
              style={{ minHeight: `${height}px` }}
            />
            {showSkeleton && isLoading && (
              <AudioVisualizerSkeleton height={height} />
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}