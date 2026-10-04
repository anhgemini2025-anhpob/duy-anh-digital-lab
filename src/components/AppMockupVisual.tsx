import React, { useState, useEffect } from 'react';
import { Play, Pause, ExternalLink, Sparkles, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview } from '../utils/navigation';

interface AppMockupVisualProps {
  app: AppItem;
  mode: 'image' | 'video';
  onOpenDetails: () => void;
  className?: string;
}

export const AppMockupVisual: React.FC<AppMockupVisualProps> = ({
  app,
  mode,
  onOpenDetails,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const visualContainerRef = React.useRef<HTMLDivElement | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Exact duration parsed from app.videoDuration or fallback
  const parseDuration = (dur: string) => {
    const parts = dur.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) return parts[0] * 60 + parts[1];
    return 60;
  };
  const totalDurationSeconds = parseDuration(app.videoDuration || '1:00');
  const totalScenes = app.videoScenes && app.videoScenes.length > 0 ? app.videoScenes.length : 3;
  const secondsPerScene = Math.max(8, totalDurationSeconds / totalScenes);

  // Auto-advancing video simulation timer (+30% speed)
  useEffect(() => {
    if (mode !== 'video' || !isPlaying) return;

    // Advance 30% faster by default (1.3x speed)
    const speedMultiplier = 1.3;
    const stepPct = (0.1 / secondsPerScene) * 100 * speedMultiplier;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSceneIdx((sc) => (sc + 1) % totalScenes);
          return 0;
        }
        return Math.min(100, prev + stepPct);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [mode, isPlaying, totalScenes, secondsPerScene]);

  // Audio voiceover sync
  useEffect(() => {
    if (mode !== 'video' || !isPlaying || isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsAudioPlaying(false);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsAudioPlaying(false);
    }

    const audioUrl = `/apps/${app.id}/audio-scene-${currentSceneIdx + 1}.mp3?v=20261004_htx_v1`;
    const audio = new Audio(audioUrl);
    audio.playbackRate = 1.3;
    audio.volume = 1.0;

    audio.onplay = () => setIsAudioPlaying(true);
    audio.onpause = () => setIsAudioPlaying(false);
    audio.onended = () => setIsAudioPlaying(false);
    audio.onerror = () => setIsAudioPlaying(false);

    audioRef.current = audio;
    audio.play().catch(() => {
      setIsAudioPlaying(false);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [mode, isPlaying, isMuted, currentSceneIdx, app.id]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isFullscreen) {
      if (visualContainerRef.current) {
        if (visualContainerRef.current.requestFullscreen) {
          visualContainerRef.current.requestFullscreen().catch(() => {});
        } else if ((visualContainerRef.current as any).webkitRequestFullscreen) {
          (visualContainerRef.current as any).webkitRequestFullscreen();
        }
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement);
      if (!isNativeFs && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const currentScene = (app.videoScenes && app.videoScenes[currentSceneIdx]) || {
    time: "0:00",
    title: app.name,
    description: app.videoTagline
  };

  // Convert progress (0-100%) to simulated mm:ss
  const currentSeconds = Math.min(
    totalDurationSeconds,
    Math.floor((progress / 100) * secondsPerScene) + (currentSceneIdx * secondsPerScene)
  );
  const displayMin = Math.floor(currentSeconds / 60);
  const displaySec = String(currentSeconds % 60).padStart(2, '0');

  // Screen selection for video scenes
  const activeVideoScreen = (app.detailImages && app.detailImages[currentSceneIdx])
    || ((currentSceneIdx === 10 && app.detailImages?.[9]) ? app.detailImages[9] : undefined)
    || (app.detailImages && app.detailImages[currentSceneIdx % app.detailImages.length])
    || app.coverImage;

  // ==========================================
  // 1. VIDEO CLIP TOUR (CRYSTAL CLEAR, FULLY VISIBLE APP SCREEN)
  // ==========================================
  if (mode === 'video') {
    return (
      <div 
        ref={visualContainerRef}
        onClick={isFullscreen ? undefined : onOpenDetails}
        className={`bg-slate-950 text-white overflow-hidden select-none group/video transition-all ${
          isFullscreen 
            ? 'fixed inset-0 z-[100] w-screen h-screen flex flex-col justify-between' 
            : `relative w-full h-full cursor-pointer ${className}`
        }`}
      >
        {/* Full-Frame Crystal-Clear App Screenshot with Dynamic Scene Transitions */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center">
          <img 
            key={activeVideoScreen}
            src={activeVideoScreen} 
            alt={currentScene.title}
            className={`w-full h-full ${
              isFullscreen ? 'object-contain' : 'object-cover'
            } object-top transition-all duration-700 ease-out ${
              isPlaying ? 'scale-[1.03]' : 'scale-100'
            }`}
          />
        </div>

        {/* Top Video Status & Brand Overlay */}
        <div className="absolute top-2 inset-x-0 z-20 flex items-center justify-between px-2.5 sm:px-3 py-1 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`} />
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-950/85 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm border border-amber-400/40 whitespace-nowrap">
              {isPlaying ? 'VIDEO DEMO' : 'TẠM DỪNG'}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-700/60 hidden sm:inline">
              1080P HD
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Wave */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
                isMuted
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-700/60'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-sm'
              }`}
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                  <span className="hidden sm:inline text-[10px]">Tắt tiếng</span>
                </>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <div className="flex items-end gap-0.5 h-2.5">
                    <span className={`w-0.5 bg-emerald-400 rounded-full ${isAudioPlaying ? 'h-2.5 animate-pulse' : 'h-1'}`} />
                    <span className={`w-0.5 bg-emerald-400 rounded-full ${isAudioPlaying ? 'h-1.5 animate-bounce' : 'h-1'}`} />
                    <span className={`w-0.5 bg-emerald-400 rounded-full ${isAudioPlaying ? 'h-2 animate-pulse' : 'h-1'}`} />
                  </div>
                </span>
              )}
            </button>

            {/* Live App Link */}
            <a
              href={app.url}
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp(app.url, e)}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 px-2.5 py-1 rounded-lg border border-amber-400/40 transition-all shadow-xs whitespace-nowrap cursor-pointer"
              title="Mở ứng dụng thật để thao tác"
            >
              <span>Mở Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold whitespace-nowrap ${
                isFullscreen
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-400 shadow-md font-black'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-400/50 hover:border-amber-400'
              }`}
              title={isFullscreen ? "Thu nhỏ trở về ban đầu (ESC)" : "Mở rộng xem toàn màn hình"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Thu nhỏ</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Toàn màn hình</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Minh Họa Bằng Từ Ngữ (Text Illustration Banner) - Chỉ hiện trên màn hình lớn */}
        <div className="hidden md:flex absolute top-11 inset-x-3 z-10 pointer-events-none justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/95 border border-amber-400/80 backdrop-blur-md shadow-lg text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-black text-amber-300 uppercase tracking-wide">
              Chức năng #{currentSceneIdx + 1}:
            </span>
            <span className="text-white font-black truncate">
              {currentScene.title}
            </span>
          </div>
        </div>

        {/* Center Simulated Interactive Cursor / Hotspot - Chỉ hiện trên màn hình lớn */}
        <div className="hidden md:flex absolute inset-0 pt-10 pointer-events-none items-center justify-center px-4">
          {isPlaying && (
            <div className="relative animate-pulse flex flex-col items-center max-w-sm w-full">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-400/30 flex items-center justify-center shadow-xl shadow-amber-500/50 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
              </div>
              <div className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/95 text-center border-2 border-amber-400/80 backdrop-blur-md shadow-2xl">
                <div className="text-sm sm:text-base font-black text-amber-300 truncate">
                  {currentScene.title}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-100 font-medium line-clamp-2 leading-relaxed">
                  {currentScene.description}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Phụ đề nổi tinh tế dưới góc, KHÔNG CHE MÀN HÌNH */}
        <div className="md:hidden absolute bottom-12 inset-x-2 z-10 flex justify-center pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-amber-400/50 shadow-xl max-w-[95%]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-[10px] font-bold text-amber-300 truncate">
              [{currentScene.time || '0:00'}] {currentScene.title}
            </span>
          </div>
        </div>

        {/* Bottom YouTube-Style Translucent Video Control Bar */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 inset-x-0 z-20 px-3 pb-2 pt-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-1.5"
        >
          {/* Progress Bar Scrubber */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(pct);
            }}
            className="w-full h-1.5 hover:h-2 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer transition-all"
            title="Tua video"
          >
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 rounded-full transition-all duration-100"
              style={{ width: `${((currentSceneIdx + progress / 100) / totalScenes) * 100}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer"
                title={isPlaying ? "Tạm dừng" : "Phát video"}
              >
                {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
              </button>

              <span className="font-mono text-[10px] text-slate-300">
                {displayMin}:{displaySec} / {app.videoDuration} • 1.3x
              </span>

              <span className="text-xs font-bold text-amber-300 truncate max-w-[150px] sm:max-w-[220px]">
                ▶ {currentScene.title}
              </span>
            </div>

            {/* Scene Selectors */}
            <div className="flex items-center gap-1">
              {app.videoScenes.map((sc, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => {
                    setCurrentSceneIdx(sIdx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    currentSceneIdx === sIdx
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-amber-300'
                  }`}
                  title={sc.title}
                >
                  {sc.time}
                </button>
              ))}

              <button
                onClick={toggleFullscreen}
                className={`p-1 transition-colors ml-1 cursor-pointer rounded ${
                  isFullscreen ? 'text-amber-400 hover:text-amber-300' : 'text-slate-400 hover:text-amber-400'
                }`}
                title={isFullscreen ? "Thu nhỏ trở về ban đầu (ESC)" : "Mở rộng xem toàn màn hình"}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // ==========================================
  // 2. IMAGE VIEW (High-Resolution Authentic Screenshot)
  // ==========================================
  return (
    <div 
      onClick={onOpenDetails}
      className={`relative w-full h-full bg-[#07111E] overflow-hidden cursor-pointer group ${className}`}
    >
      <img
        src={app.coverImage}
        alt={app.imageAlt}
        loading="lazy"
        onError={() => {
          if (app.coverImage !== app.placeholderImage) {
            setImageError(true);
          }
        }}
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      {/* Hover Overlay */}
      <div className="hidden md:flex absolute inset-0 bg-[#07111E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center backdrop-blur-[2px]">
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 hover:scale-105 transition-transform">
          <span>Xem chi tiết &amp; Trải nghiệm</span>
          <ExternalLink className="w-4 h-4 text-slate-950" />
        </span>
      </div>
    </div>
  );
};
