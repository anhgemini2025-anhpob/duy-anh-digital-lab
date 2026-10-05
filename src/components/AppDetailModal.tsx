import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Eye, EyeOff, Check, Plus, ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Volume2, VolumeX, Video, Image as ImageIcon, CheckCircle2, HelpCircle, Target, Sparkles, Clock, SkipBack, SkipForward, Share2, Copy, FileDown, FileText, BookOpen, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview, downloadPdfFile } from '../utils/navigation';
import { PdfViewerModal } from './PdfViewerModal';

// Persistent singleton audio instance (preserves user interaction authorization across apps & scenes)
let globalVoiceoverAudio: HTMLAudioElement | null = null;

function getGlobalVoiceoverAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!globalVoiceoverAudio) {
    globalVoiceoverAudio = new Audio();
    globalVoiceoverAudio.preload = 'auto';
  }
  return globalVoiceoverAudio;
}

interface AppDetailModalProps {
  app: AppItem | null;
  allApps?: AppItem[];
  onSelectApp?: (app: AppItem, initialTab?: 'image' | 'video') => void;
  initialTab?: 'image' | 'video';
  onClose: () => void;
  onToggleRequest: (app: AppItem) => void;
  isRequested: boolean;
}

const parseDurationSeconds = (dur?: string): number => {
  if (!dur) return 60;
  const parts = dur.split(':').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 60;
};

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  allApps,
  onSelectApp,
  initialTab = 'image',
  onClose,
  onToggleRequest,
  isRequested
}) => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'image' | 'video'>(initialTab);
  const [isAutoSlideshow, setIsAutoSlideshow] = useState<boolean>(true);
  const [slideshowProgress, setSlideshowProgress] = useState<number>(0);
  const [isHoveredImage, setIsHoveredImage] = useState<boolean>(false);
  const [selectedSceneIdx, setSelectedSceneIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.3);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const videoContainerRef = React.useRef<HTMLDivElement | null>(null);
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);

  const currentIndex = allApps && app ? allApps.findIndex((a) => a.id === app.id) : -1;
  const prevApp = currentIndex > 0 ? allApps![currentIndex - 1] : (allApps && allApps.length > 0 ? allApps![allApps.length - 1] : null);
  const nextApp = currentIndex >= 0 && allApps && currentIndex < allApps.length - 1 ? allApps![currentIndex + 1] : (allApps && allApps.length > 0 ? allApps![0] : null);

  const handleCopyAppLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!app?.url) return;
    navigator.clipboard.writeText(app.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const gallery = app ? [app.coverImage, ...(app.detailImages || []).filter(img => img !== app.coverImage)] : [];

  // Reset states when changing app or modal opens
  useEffect(() => {
    setActiveImageIdx(0);
    setSlideshowProgress(0);
    setIsAutoSlideshow(true);
    setSelectedSceneIdx(0);
    setVideoProgress(0);
    setIsPlayingVideo(true); // Always start video playing when opening an app
    setIsAudioPlaying(false);
    setIsVideoFullscreen(false);
    setIsPdfViewerOpen(false);
    if (initialTab) {
      setActiveTab(initialTab);
    }
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [app?.id, initialTab]);

  // Auto-play slideshow timer for images (3.5s per image)
  useEffect(() => {
    if (!app || activeTab !== 'image' || !isAutoSlideshow || isHoveredImage || gallery.length <= 1) {
      return;
    }

    const intervalMs = 100;
    const stepPct = (intervalMs / 3500) * 100;

    const timer = setInterval(() => {
      setSlideshowProgress((prev) => {
        if (prev >= 100) {
          setActiveImageIdx((imgIdx) => (imgIdx + 1) % gallery.length);
          return 0;
        }
        return Math.min(100, prev + stepPct);
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [app, activeTab, isAutoSlideshow, isHoveredImage, gallery.length]);

  // Unified Audio Voiceover & Video Progress Engine
  // Reuses singleton HTMLAudioElement so user gesture authorization is maintained across all app transitions
  useEffect(() => {
    if (!app || activeTab !== 'video') {
      const audio = getGlobalVoiceoverAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsAudioPlaying(false);
      return;
    }

    const audio = getGlobalVoiceoverAudio();
    if (!audio) return;

    const AUDIO_BUILD_VERSION = '20261005_quan_ly_hop_dong_v1';
    const audioUrl = `/apps/${app.id}/audio-scene-${selectedSceneIdx + 1}.mp3?v=${AUDIO_BUILD_VERSION}`;
    
    // Only update and load if src is different
    if (!audio.src.includes(audioUrl)) {
      audio.pause();
      audio.src = audioUrl;
      audio.load();
    }

    audio.playbackRate = videoSpeed;
    audio.muted = isMuted;
    audio.volume = 1.0;

    let isSubscribed = true;

    const onPlay = () => {
      if (isSubscribed) setIsAudioPlaying(true);
    };
    const onPause = () => {
      if (isSubscribed) setIsAudioPlaying(false);
    };
    const onError = () => {
      console.warn(`[Audio] Notice for ${app.id} scene ${selectedSceneIdx + 1}`);
      if (isSubscribed) setIsAudioPlaying(false);
    };

    const onTimeUpdate = () => {
      if (isSubscribed && audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setVideoProgress(Math.min(100, Math.max(0, pct)));
      }
    };

    const onEnded = () => {
      if (!isSubscribed) return;
      setIsAudioPlaying(false);
      const scenesCount = app.videoScenes?.length || 5;
      if (selectedSceneIdx < scenesCount - 1) {
        // Automatically progress to next scene smoothly
        setSelectedSceneIdx((prev) => prev + 1);
        setVideoProgress(0);
      } else {
        // Last scene ended - gracefully wrap up
        setSelectedSceneIdx(0);
        setVideoProgress(0);
        setIsPlayingVideo(false);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    if (isPlayingVideo && !isMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isSubscribed) setIsAudioPlaying(true);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn("Audio play prevented:", err);
            }
            if (isSubscribed) setIsAudioPlaying(false);
          });
      }
    } else {
      audio.pause();
    }

    return () => {
      isSubscribed = false;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [app?.id, selectedSceneIdx, activeTab, isPlayingVideo, isMuted, videoSpeed]);

  // Fallback Timer: Only advances video if audio is muted or unavailable
  useEffect(() => {
    if (!app || activeTab !== 'video' || !isPlayingVideo || isAudioPlaying) return;

    const totalDurationSeconds = parseDurationSeconds(app.videoDuration);
    const scenesCount = app.videoScenes?.length || 5;
    const secondsPerScene = totalDurationSeconds / scenesCount;
    const stepPct = (0.1 / secondsPerScene) * 100 * videoSpeed;

    const interval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          setSelectedSceneIdx((sc) => (sc + 1) % scenesCount);
          return 0;
        }
        return Math.min(100, prev + stepPct);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [app, activeTab, isPlayingVideo, isAudioPlaying, videoSpeed]);

  // Cleanup audio on modal unmount (pause and reset, DO NOT destroy singleton instance)
  useEffect(() => {
    return () => {
      const audio = getGlobalVoiceoverAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const skipTime = (deltaSeconds: number) => {
    if (!app) return;
    const audio = getGlobalVoiceoverAudio();
    if (audio && audio.duration && !isNaN(audio.duration)) {
      const newTime = audio.currentTime + deltaSeconds;
      if (newTime >= audio.duration) {
        const scenesCount = app.videoScenes?.length || 5;
        setSelectedSceneIdx((sc) => Math.min(scenesCount - 1, sc + 1));
        setVideoProgress(0);
      } else if (newTime < 0) {
        setSelectedSceneIdx((sc) => Math.max(0, sc - 1));
        setVideoProgress(0);
      } else {
        audio.currentTime = newTime;
        setVideoProgress((newTime / audio.duration) * 100);
      }
      return;
    }
    const totalDurationSeconds = parseDurationSeconds(app.videoDuration);
    const scenesCount = app.videoScenes?.length || 5;
    const secondsPerScene = totalDurationSeconds / scenesCount;
    setVideoProgress((prev) => {
      const step = (deltaSeconds / secondsPerScene) * 100;
      const next = prev + step;
      if (next >= 100) {
        setSelectedSceneIdx((sc) => Math.min(scenesCount - 1, sc + 1));
        return 0;
      }
      if (next < 0) {
        setSelectedSceneIdx((sc) => Math.max(0, sc - 1));
        return 50;
      }
      return next;
    });
  };

  // Fullscreen toggle & Escape key listener for video player
  const toggleVideoFullscreen = () => {
    if (!isVideoFullscreen) {
      if (videoContainerRef.current) {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen().catch(() => {});
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          (videoContainerRef.current as any).webkitRequestFullscreen();
        }
      }
      setIsVideoFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      }
      setIsVideoFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement);
      if (!isNativeFs && isVideoFullscreen) {
        setIsVideoFullscreen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsVideoFullscreen(false);
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
  }, [isVideoFullscreen]);

  const getImageCaption = (idx: number, imgUrl: string) => {
    if (app?.videoScenes && app.videoScenes[idx]?.title) {
      return app.videoScenes[idx].title;
    }
    if (imgUrl.includes('illustration') || imgUrl.includes('banner')) return 'Infographic & Mô hình minh họa giải pháp trực quan';
    if (imgUrl.includes('real-cover') || imgUrl.includes('real-screen-1')) return 'Giao diện bảng điều khiển ứng dụng thực tế (Chính)';
    if (imgUrl.includes('real-screen-2')) return 'Chi tiết tính năng & Thao tác nghiệp vụ';
    if (imgUrl.includes('real-screen-3')) return 'Báo cáo số liệu & Chứng thư kết quả chuẩn hóa';
    if (imgUrl.includes('real-screenshot') || imgUrl.includes('hinh')) return 'Ảnh chụp màn hình ứng dụng thực tế';
    if (imgUrl.includes('demand-forecast')) return 'Biểu đồ mô phỏng dự báo nhu cầu thực tế';
    if (imgUrl.includes('sensitivity')) return 'Phân tích độ nhạy mức độ dịch vụ (CSL)';
    if (imgUrl.includes('supply-chain')) return 'Sơ đồ 6 nhân tố chuỗi cung ứng SCM';
    if (imgUrl.includes('bioskn')) return 'Dữ liệu thử nghiệm lâm sàng thực tế';
    if (imgUrl.includes('mindmap')) return 'Sơ đồ tư duy ứng dụng sản phẩm';
    if (imgUrl.includes('infographic')) return 'Tài liệu kỹ thuật & Infographic sản phẩm';
    if (imgUrl.includes('product-grid')) return 'Danh mục mẫu sản phẩm thực tế';
    if (imgUrl.includes('htx-icon')) return 'Bộ nhận diện thương hiệu HTX';
    if (idx === 0) return 'Giao diện Bảng điều khiển chính (Dashboard)';
    if (idx === 1) return 'Thao tác Nghiệp vụ & Tính năng cốt lõi (Workflow Screen)';
    if (idx === 2) return 'Báo cáo Số liệu & Chứng thư kết quả (Analytics & Report)';
    return `Màn hình nghiệp vụ #${idx + 1}`;
  };

  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Content Container (Navy & Gold Luxury - Spacious & Highly Legible) */}
      <div ref={modalContentRef} className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#07111E] border border-amber-500/30 text-white rounded-3xl shadow-2xl z-10 flex flex-col my-auto scrollbar-thin scrollbar-thumb-amber-500/20">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#0A192F]/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-[#0E223D] border border-amber-400/40 p-1 flex items-center justify-center shadow-sm">
              <img 
                src={app.logoUrl} 
                alt={`${app.name} logo`} 
                className="w-full h-full object-contain rounded"
              />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold px-2.5 py-1 rounded-md border bg-amber-400/10 text-amber-300 border-amber-400/30 truncate max-w-[120px] sm:max-w-none">
              {app.category}
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-[140px] sm:max-w-[220px] hidden md:inline">
              {app.name}
            </span>
            <span className="hidden lg:inline text-xs font-mono text-slate-400">ID: {app.id}</span>

            {/* Quick Prev / Next App Switcher in Header */}
            {allApps && onSelectApp && currentIndex !== -1 && (
              <div className="flex items-center gap-0.5 sm:gap-1 bg-[#07111E] rounded-xl p-0.5 border border-slate-700/80 ml-1">
                <button
                  onClick={() => prevApp && onSelectApp(prevApp, activeTab)}
                  disabled={!prevApp}
                  className="p-1 sm:px-2 sm:py-1 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-[#0E223D] disabled:opacity-30 transition-all cursor-pointer flex items-center gap-1"
                  title={`Ứng dụng trước: ${prevApp?.name}`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px] font-bold">Trước</span>
                </button>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 px-1 sm:px-1.5">
                  {currentIndex + 1}/{allApps.length}
                </span>
                <button
                  onClick={() => nextApp && onSelectApp(nextApp, activeTab)}
                  disabled={!nextApp}
                  className="p-1 sm:px-2 sm:py-1 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-[#0E223D] disabled:opacity-30 transition-all cursor-pointer flex items-center gap-1"
                  title={`Ứng dụng kế tiếp: ${nextApp?.name}`}
                >
                  <span className="hidden lg:inline text-[11px] font-bold">Kế tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            )}
          </div>

          {/* Media Switcher: Ảnh vs Video Clip */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center bg-[#07111E] rounded-xl p-0.5 sm:p-1 border border-slate-700">
              <button
                onClick={() => {
                  setActiveTab('image');
                  const audio = getGlobalVoiceoverAudio();
                  if (audio) audio.pause();
                  if (modalContentRef.current) modalContentRef.current.scrollTop = 0;
                }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Hình ảnh</span>
                <span className="sm:hidden">Ảnh</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('video');
                  setIsPlayingVideo(true);
                  if (modalContentRef.current) modalContentRef.current.scrollTop = 0;
                }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Video Clip Tour</span>
                <span className="sm:hidden">Video</span>
              </button>
            </div>

            {app.userManual && (
              <button
                onClick={() => setIsPdfViewerOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-md shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
                title={`Đọc & lưu sách hướng dẫn sử dụng (${app.userManual.fileSize})`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Sách Hướng Dẫn ({app.userManual.fileSize})</span>
                <span className="md:hidden">Sách HDSD</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0E223D] transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          
          {/* MEDIA SECTION: IMAGE GALLERY OR VIDEO CLIP SIMULATION */}
          {activeTab === 'image' ? (
            <div className="space-y-3">
              {/* Main Image Screen Container with Auto-Slideshow */}
              <div 
                onMouseEnter={() => setIsHoveredImage(true)}
                onMouseLeave={() => setIsHoveredImage(false)}
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0B1A2F] border border-slate-750 shadow-md group select-none"
              >
                <img
                  key={gallery[activeImageIdx]}
                  src={gallery[activeImageIdx] || app.placeholderImage}
                  alt={app.imageAlt}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== app.placeholderImage) {
                      target.src = app.placeholderImage;
                    }
                  }}
                  className="w-full h-full object-cover object-top animate-in fade-in duration-300"
                />

                {/* Top Caption Pill */}
                <div className="absolute top-3 left-3 bg-[#07111E]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg z-20">
                  <span className={`w-2.5 h-2.5 rounded-full ${isAutoSlideshow && !isHoveredImage ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="font-black text-amber-300">Ảnh {activeImageIdx + 1}/{gallery.length}:</span>
                  <span className="truncate max-w-[200px] sm:max-w-md md:max-w-lg text-slate-100 font-medium">{getImageCaption(activeImageIdx, gallery[activeImageIdx])}</span>
                </div>

                {/* Top Right: Slideshow Auto-Play Control Pill */}
                {gallery.length > 1 && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoSlideshow(!isAutoSlideshow);
                        setSlideshowProgress(0);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
                        isAutoSlideshow
                          ? isHoveredImage
                            ? 'bg-[#0E223D]/95 text-amber-300 border-amber-400/50'
                            : 'bg-[#07111E]/95 text-amber-300 border-amber-400/40 hover:bg-[#0E223D]'
                          : 'bg-[#07111E]/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title={isAutoSlideshow ? (isHoveredImage ? "Tạm dừng (đang rê chuột)" : "Bấm để tắt tự động chuyển ảnh") : "Bấm để bật tự động chuyển ảnh"}
                    >
                      {isAutoSlideshow ? (
                        <>
                          {isHoveredImage ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-amber-400" />
                              <span className="hidden sm:inline">Tạm dừng (Hover)</span>
                              <span className="sm:hidden">Dừng</span>
                            </>
                          ) : (
                            <>
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                              </span>
                              <span className="hidden sm:inline">Tự động chuyển (3.5s)</span>
                              <span className="sm:hidden">Auto</span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current text-slate-400" />
                          <span className="hidden sm:inline">Bật tự động</span>
                          <span className="sm:hidden">Auto</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Auto-slideshow linear progress indicator line at bottom of image */}
                {isAutoSlideshow && gallery.length > 1 && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-900/80 z-20">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-100 ease-linear shadow-xs shadow-amber-400/50"
                      style={{ width: `${slideshowProgress}%` }}
                    />
                  </div>
                )}

                {/* Gallery navigation arrows */}
                {gallery.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
                        setSlideshowProgress(0);
                      }}
                      className="p-2.5 rounded-xl bg-[#0A192F]/90 text-amber-400 hover:bg-[#0E223D] hover:text-amber-300 pointer-events-auto border border-amber-500/30 shadow-lg backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
                      title="Xem ảnh trước"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
                        setSlideshowProgress(0);
                      }}
                      className="p-2.5 rounded-xl bg-[#0A192F]/90 text-amber-400 hover:bg-[#0E223D] hover:text-amber-300 pointer-events-auto border border-amber-500/30 shadow-lg backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
                      title="Xem ảnh kế tiếp"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails with captions */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveImageIdx(i);
                        setSlideshowProgress(0);
                      }}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer text-left ${
                        activeImageIdx === i
                          ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-md scale-[1.02]'
                          : 'border-slate-850 opacity-70 hover:opacity-100 hover:border-amber-400/50'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#07111E]">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="block text-xs font-bold text-slate-200 truncate mt-1 px-1 flex items-center justify-between">
                        <span>Màn hình #{i + 1}</span>
                        {activeImageIdx === i && isAutoSlideshow && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* VIDEO CLIP WALKTHROUGH TOUR (COMPLETE INTERACTIVE PLAYER) */
            <div className="space-y-4">
              {/* Dynamic screen image based on scene */}
              {(() => {
                const activeVideoScreen = (app.detailImages && app.detailImages[selectedSceneIdx])
                  || ((selectedSceneIdx === 10 && app.detailImages?.[9]) ? app.detailImages[9] : undefined)
                  || (app.detailImages && app.detailImages[selectedSceneIdx % app.detailImages.length])
                  || app.coverImage;

                const totalDurationSeconds = parseDurationSeconds(app.videoDuration);
                const scenesCount = app.videoScenes?.length || 5;
                const secondsPerScene = totalDurationSeconds / scenesCount;

                const currentSeconds = Math.min(
                  totalDurationSeconds,
                  Math.floor((videoProgress / 100) * secondsPerScene) + (selectedSceneIdx * secondsPerScene)
                );
                const displayMin = Math.floor(currentSeconds / 60);
                const displaySec = String(currentSeconds % 60).padStart(2, '0');

                return (
                  <div 
                    ref={videoContainerRef}
                    className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 text-white flex flex-col justify-between shadow-2xl border border-slate-800 select-none group/video transition-all ${
                      isVideoFullscreen
                        ? 'fixed inset-0 z-[100] w-screen h-screen rounded-none border-0'
                        : 'aspect-[16/10]'
                    }`}
                  >
                    
                    {/* 1. Full-Frame Crystal-Clear App Screenshot (ZERO BLUR, FULL BRIGHTNESS) */}
                    <div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center">
                      <img 
                        key={activeVideoScreen}
                        src={activeVideoScreen} 
                        alt={app.videoScenes[selectedSceneIdx]?.title || app.name}
                        className={`w-full h-full ${
                          isVideoFullscreen ? 'object-contain' : 'object-cover'
                        } object-top transition-all duration-700 ease-out ${
                          isPlayingVideo ? 'scale-[1.02]' : 'scale-100'
                        }`}
                      />
                    </div>

                    {/* Minh Họa Bằng Từ Ngữ (Text Illustration Banner) - Chỉ hiện trên Laptop/Desktop */}
                    <div className="hidden md:flex absolute top-14 inset-x-4 z-10 pointer-events-none justify-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-md shadow-2xl text-xs sm:text-sm max-w-full border ${
                        app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                          ? 'bg-slate-950/95 border-emerald-400/90 shadow-emerald-500/20'
                          : 'bg-slate-950/95 border-amber-400/80 shadow-black'
                      }`}>
                        <Sparkles className={`w-4 h-4 shrink-0 ${app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình') ? 'text-emerald-400' : 'text-amber-400'}`} />
                        <span className={`font-black uppercase tracking-wider shrink-0 ${
                          app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                            ? 'text-emerald-300'
                            : 'text-amber-300'
                        }`}>
                          {app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                            ? '💡 LỜI BÌNH & BẤT NGỜ:'
                            : `Chức năng #${selectedSceneIdx + 1}:`}
                        </span>
                        <span className="text-white font-black truncate text-xs sm:text-sm">
                          {app.videoScenes[selectedSceneIdx]?.title}
                        </span>
                      </div>
                    </div>

                    {/* 2. Top Video Status & Controls Header (Gọn gàng, không bị tràn/xuống hàng trên mọi kích thước) */}
                    <div className="relative z-10 flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2.5 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isPlayingVideo ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-950/85 text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm border border-amber-400/40 whitespace-nowrap">
                          {isPlayingVideo ? 'VIDEO TOUR' : 'TẠM DỪNG'}
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#081321] border border-amber-400/40 shadow-xs">
                          <img src={app.logoUrl} alt={app.name} className="h-3.5 sm:h-4 w-3.5 sm:w-4 object-contain rounded" />
                          <span className="text-[9px] sm:text-[10px] font-bold text-amber-200 truncate max-w-[120px] hidden xs:inline">{app.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2 text-xs font-mono text-slate-300">
                        {/* Speed Selector */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideoSpeed((prev) => (prev === 1.3 ? 1.6 : prev === 1.6 ? 1 : 1.3));
                          }}
                          className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-amber-400/50 transition-colors cursor-pointer font-bold text-[10px] sm:text-xs whitespace-nowrap"
                          title="Tốc độ phát video (Mặc định +30%)"
                        >
                          {videoSpeed === 1.3 ? '1.3x' : `${videoSpeed}x`}
                        </button>

                        {/* Direct App Link Button */}
                        <a
                          href={app.url}
                          target={isMobileOrWebview() ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          onClick={(e) => openExternalApp(app.url, e)}
                          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-500 px-2.5 py-1 rounded-lg transition-all shadow-md whitespace-nowrap cursor-pointer"
                          title="Mở ứng dụng thực tế trên Web"
                        >
                          <span>Mở App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        {/* Nút Mở rộng xem toàn màn hình / Thu nhỏ trở về ban đầu */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoFullscreen();
                          }}
                          className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border transition-all cursor-pointer font-bold text-[10px] sm:text-xs shadow-md whitespace-nowrap ${
                            isVideoFullscreen
                              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-400 shadow-amber-500/30'
                              : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-amber-400/50 hover:border-amber-400'
                          }`}
                          title={isVideoFullscreen ? "Thu nhỏ trở về ban đầu (Phím ESC)" : "Mở rộng xem toàn màn hình"}
                        >
                          {isVideoFullscreen ? (
                            <>
                              <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950" />
                              <span className="hidden sm:inline">Thu nhỏ</span>
                            </>
                          ) : (
                            <>
                              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                              <span className="hidden sm:inline">Toàn màn hình</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 3. Center Screen Simulated Interaction Hotspot - Hiển thị đồng bộ đẹp mắt trên cả Laptop và Điện thoại */}
                    <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center my-auto px-2 sm:px-4 w-full">
                      {isPlayingVideo && (
                        <div className="flex flex-col items-center max-w-[94%] sm:max-w-xl w-full animate-in fade-in zoom-in-95 duration-200">
                          {/* Pulsing Target Ring */}
                          <div className="relative mb-1 sm:mb-2 flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full border sm:border-2 border-amber-400 bg-amber-400/30 flex items-center justify-center shadow-lg sm:shadow-2xl shadow-amber-400/70 animate-ping absolute" />
                            <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full border sm:border-2 border-amber-300 bg-[#07111E]/90 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black relative z-10">
                              <Sparkles className="w-4 h-4 sm:w-7 sm:h-7 text-amber-300" />
                            </div>
                          </div>

                          {/* Large, Crystal-Clear Feature Explanation Card */}
                          <div className={`w-full backdrop-blur-xl border sm:border-2 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl text-center ${
                            app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                              ? 'bg-[#041E26]/95 border-emerald-400/90 shadow-emerald-950/50'
                              : 'bg-[#07111E]/95 border-amber-400/90 shadow-black'
                          }`}>
                            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
                              <div className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-slate-950 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md ${
                                app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950'
                                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950'
                              }`}>
                                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950" />
                                <span>
                                  {app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                                    ? `💡 LỜI BÌNH & ĐIỂM BẤT NGỜ • ${app.videoScenes[selectedSceneIdx]?.time || '1:00'}`
                                    : `CHỨC NĂNG #${selectedSceneIdx + 1} • ${app.videoScenes[selectedSceneIdx]?.time || '0:00'}`}
                                </span>
                              </div>
                            </div>
                            
                            {/* Feature Name */}
                            <h4 className={`text-xs sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug drop-shadow-md break-words ${
                              app.videoScenes[selectedSceneIdx]?.title.includes('Lời bình')
                                ? 'text-emerald-300'
                                : 'text-amber-300'
                            }`}>
                              {app.videoScenes[selectedSceneIdx]?.title}
                            </h4>

                            {/* Feature Description */}
                            <p className="mt-1 text-[11px] sm:text-base lg:text-lg text-white font-medium leading-relaxed max-w-xl mx-auto bg-slate-900/80 px-2 sm:px-3.5 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-slate-700/80 line-clamp-2 sm:line-clamp-3">
                              {app.videoScenes[selectedSceneIdx]?.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4. Bottom Video Player Controls & Subtitles Bar */}
                    <div className="relative z-10 p-2 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent space-y-1.5 sm:space-y-2.5">
                      
                      {/* Subtitle Caption Line */}
                      <div className="flex items-center justify-between text-[10px] sm:text-sm text-slate-100 font-medium bg-slate-900/90 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-slate-800 backdrop-blur-md">
                        <span className="text-amber-300 font-bold truncate flex-1 min-w-0 mr-2 text-[10px] sm:text-sm">
                          ▶ [{app.videoScenes[selectedSceneIdx]?.time || '0:00'}] {app.videoScenes[selectedSceneIdx]?.title}: <span className="text-white font-normal hidden sm:inline">{app.videoScenes[selectedSceneIdx]?.description}</span>
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-amber-300 font-bold shrink-0 ml-1.5 bg-[#07111E] px-1.5 sm:px-2 py-0.5 rounded border border-amber-400/40">
                          {selectedSceneIdx + 1}/{app.videoScenes?.length || 3} • {videoSpeed}x
                        </span>
                      </div>

                      {/* Timeline Scrubber */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                          setVideoProgress(pct);
                          const audio = getGlobalVoiceoverAudio();
                          if (audio && audio.duration && !isNaN(audio.duration)) {
                            audio.currentTime = (pct / 100) * audio.duration;
                          }
                        }}
                        className="w-full h-1.5 sm:h-2 hover:h-2.5 rounded-full bg-slate-800 overflow-hidden cursor-pointer transition-all relative"
                        title="Click để tua video"
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 rounded-full transition-all duration-100"
                          style={{ width: `${((selectedSceneIdx + videoProgress / 100) / (app.videoScenes?.length || 5)) * 100}%` }}
                        />
                      </div>

                      {/* Action buttons row */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              skipTime(-10);
                            }}
                            className="p-1 sm:p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                            title="Lùi 10 giây"
                          >
                            <SkipBack className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlayingVideo(!isPlayingVideo);
                            }}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] sm:text-xs shadow-md shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap"
                          >
                            {isPlayingVideo ? (
                              <>
                                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                                <span>Tạm dừng</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                                <span>Phát</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              skipTime(10);
                            }}
                            className="p-1 sm:p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                            title="Tua tới 10 giây"
                          >
                            <SkipForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoProgress(0);
                              setSelectedSceneIdx(0);
                              setIsPlayingVideo(true);
                            }}
                            className="p-1 sm:p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                            title="Xem lại từ đầu"
                          >
                            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>

                          {/* Audio Mute/Unmute */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted(!isMuted);
                            }}
                            className={`p-1 sm:p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isMuted
                                ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-400 border-slate-700'
                                : 'bg-slate-800/90 hover:bg-slate-700 text-emerald-400 border-emerald-500/50'
                            }`}
                            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                          >
                            {isMuted ? (
                              <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            ) : (
                              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            )}
                          </button>

                          <span className="font-mono text-slate-400 text-[10px] sm:text-[11px] ml-0.5 sm:ml-1 whitespace-nowrap">
                            {displayMin}:{displaySec} / {app.videoDuration}
                          </span>
                        </div>

                        {/* Scene quick jumper & Fullscreen toggle */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            {app.videoScenes.map((sc, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSceneIdx(sIdx);
                                  setVideoProgress(0);
                                  setIsPlayingVideo(true);
                                }}
                                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                                  selectedSceneIdx === sIdx
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-slate-800/90 text-slate-400 hover:text-white'
                                }`}
                                title={sc.title}
                              >
                                {sc.time}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVideoFullscreen();
                            }}
                            className={`p-1 sm:p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                              isVideoFullscreen
                                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border-slate-700'
                            }`}
                            title={isVideoFullscreen ? "Thu nhỏ trở về ban đầu (ESC)" : "Mở rộng xem toàn màn hình"}
                          >
                            {isVideoFullscreen ? (
                              <>
                                <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950" />
                                <span className="text-[10px] hidden sm:inline font-bold">Thu nhỏ</span>
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                                <span className="text-[10px] hidden sm:inline font-bold">Toàn màn hình</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })()}

              {/* Video Scene Breakdown Interactive Buttons (5 Cột cân đối, mượt mà trên cả Mobile & Laptop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-2.5">
                {app.videoScenes.map((scene, idx) => {
                  const isReviewScene = scene.title.includes('Lời bình');
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSceneIdx(idx);
                        setVideoProgress(0);
                        setIsPlayingVideo(true);
                      }}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedSceneIdx === idx
                          ? isReviewScene
                            ? 'bg-emerald-950/40 border-emerald-400 text-emerald-100 shadow-lg ring-2 ring-emerald-400/30'
                            : 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-md ring-2 ring-amber-400/20'
                          : isReviewScene
                            ? 'bg-gradient-to-br from-[#0B253A] to-[#0A1D30] border-emerald-500/40 text-slate-300 hover:border-emerald-400/70 hover:bg-[#0F2F49]'
                            : 'bg-[#0E223D] border-slate-700/80 text-slate-300 hover:bg-[#142C4C] hover:border-slate-650'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold w-full">
                        <span className={selectedSceneIdx === idx ? (isReviewScene ? 'text-emerald-400 flex items-center gap-1 font-black' : 'text-amber-400 flex items-center gap-1 font-black') : (isReviewScene ? 'text-emerald-400 flex items-center gap-1 font-bold' : 'text-slate-400')}>
                          {selectedSceneIdx === idx && <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isReviewScene ? 'bg-emerald-400' : 'bg-amber-400'} animate-ping`} />}
                          <span className="truncate">
                            {isReviewScene ? '💡 Lời bình & Bất ngờ' : (selectedSceneIdx === idx ? `Đang phát #${idx + 1}` : `Phần #${idx + 1}`)}
                          </span>
                        </span>
                        <span className={`font-mono px-1.5 py-0.5 rounded border text-[9px] sm:text-[10px] font-bold shrink-0 ml-1 ${
                          isReviewScene
                            ? 'bg-[#061C24] border-emerald-500/60 text-emerald-300'
                            : 'bg-[#07111E] border-slate-700 text-amber-300'
                        }`}>
                          {scene.time}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white mt-1 line-clamp-1">
                        {scene.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {scene.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick App Transition Bar (Chuyển tiếp tức thì sang App kế tiếp) */}
              {allApps && onSelectApp && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0A192F] via-[#0E223D] to-[#0A192F] border border-amber-500/30 shadow-lg">
                  <button
                    onClick={() => prevApp && onSelectApp(prevApp, 'video')}
                    className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-200 hover:text-amber-300 bg-[#07111E] hover:bg-[#0B1A2F] border border-slate-700 hover:border-amber-400/50 transition-all cursor-pointer group"
                    title={`Chuyển xem video ứng dụng trước: ${prevApp?.name}`}
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-slate-400 text-xs">Trước:</span>
                    <span className="truncate max-w-[140px] sm:max-w-[200px] text-white font-extrabold">{prevApp?.name}</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-extrabold bg-[#07111E] px-3.5 py-1.5 rounded-lg border border-amber-400/30 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ứng dụng {currentIndex + 1} / {allApps.length}</span>
                  </div>

                  <button
                    onClick={() => nextApp && onSelectApp(nextApp, 'video')}
                    className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer group active:scale-95"
                    title={`Chuyển xem video ứng dụng kế tiếp: ${nextApp?.name}`}
                  >
                    <span className="text-slate-900 font-extrabold text-xs">Kế tiếp:</span>
                    <span className="truncate max-w-[140px] sm:max-w-[200px] text-slate-950 font-black">{nextApp?.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* App Title & Description with App Logo */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-[#0E223D] border border-amber-400/40 shadow-xl p-2 flex items-center justify-center">
              <img 
                src={app.logoUrl} 
                alt={`${app.name} logo`} 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border ${app.theme.badgeBg} ${app.theme.badgeText} ${app.theme.badgeBorder}`}>
                  {app.category}
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-400 font-medium">Duy Anh Lab Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {app.name}
              </h2>
              <p className="text-base sm:text-lg text-slate-200 mt-2 leading-relaxed font-normal">
                {app.description}
              </p>
            </div>
          </div>

          {/* Demo Credential Protection Section (Section 16) */}
          {app.demoCredential && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E223D] border border-amber-400/40 text-amber-200 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="font-black text-base sm:text-lg text-white">Tài khoản truy cập thử nghiệm (Demo Access)</span>
                </div>
                <button
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 transition-colors cursor-pointer"
                >
                  {showCredentials ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Ẩn mật khẩu</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Hiện mật khẩu demo</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base bg-[#07111E] p-4 rounded-xl font-mono border border-slate-700 shadow-xs">
                <div>
                  <span className="text-slate-400 font-sans">Tài khoản: </span>
                  <span className="text-white font-bold select-all">{app.demoCredential.account}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans">Mật khẩu: </span>
                  <span className="text-amber-300 font-bold select-all">
                    {showCredentials ? app.demoCredential.password?.replace(/^[•\s\(\)]+/g, '').replace(')', '') : '••••••••••••'}
                  </span>
                </div>
              </div>
              {app.demoCredential.note && (
                <p className="text-xs sm:text-sm text-amber-300/90 mt-2.5 font-medium">
                  * {app.demoCredential.note}
                </p>
              )}
            </div>
          )}

          {/* User Manual Document Section (if available) */}
          {app.userManual && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#062419] via-[#0E223D] to-[#0A192F] border-2 border-emerald-500/50 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-black bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
                        TÀI LIỆU CHÍNH THỨC
                      </span>
                      <span className="text-xs font-mono text-slate-300">PDF • {app.userManual.fileSize}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1">
                      {app.userManual.title}
                    </h3>
                    {app.userManual.description && (
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                        {app.userManual.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
                  <button
                    onClick={() => setIsPdfViewerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#07111E] hover:bg-[#142C4C] text-slate-200 border border-slate-700 hover:border-emerald-400/50 transition-all cursor-pointer shadow-xs"
                    title="Đọc sách hướng dẫn trực tiếp (có nút trở về app & lưu file)"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Đọc sách HDSD</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (!app.userManual) return;
                      setIsDownloadingPdf(true);
                      setPdfDownloaded(false);
                      try {
                        await downloadPdfFile(app.userManual.url, app.userManual.fileName);
                        setPdfDownloaded(true);
                        setTimeout(() => setPdfDownloaded(false), 3000);
                      } finally {
                        setIsDownloadingPdf(false);
                      }
                    }}
                    disabled={isDownloadingPdf}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-lg transition-all cursor-pointer ${
                      pdfDownloaded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 active:scale-95'
                    }`}
                    title={`Lưu file PDF ${app.userManual.fileName} về máy mà không bị mất trang`}
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang lưu...</span>
                      </>
                    ) : pdfDownloaded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Đã lưu file!</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span>Tải về máy ({app.userManual.fileSize})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E223D] border border-slate-700/80 space-y-2.5 shadow-md">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-red-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Nỗi đau &amp; Bài toán thực tế</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                {app.problem}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E223D] border border-slate-700/80 space-y-2.5 shadow-md">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-400 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Giải pháp &amp; Giá trị mang lại</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                {app.solution}
              </p>
            </div>
          </div>

          {/* Visual Concept & Solution Infographic (if available) */}
          {app.illustrationImage && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-3 shadow-lg overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                    Mô hình trực quan &amp; Minh họa giải pháp
                  </span>
                </div>
                <button
                  onClick={() => {
                    const idx = gallery.findIndex(img => img === app.illustrationImage);
                    if (idx !== -1) {
                      setActiveTab('image');
                      setActiveImageIdx(idx);
                    }
                  }}
                  className="text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Mở xem chi tiết ảnh</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div
                onClick={() => {
                  const idx = gallery.findIndex(img => img === app.illustrationImage);
                  if (idx !== -1) {
                    setActiveTab('image');
                    setActiveImageIdx(idx);
                  }
                }}
                className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 cursor-pointer group/banner shadow-md"
              >
                <img
                  src={app.illustrationImage}
                  alt={`Mô hình trực quan hóa ${app.name}`}
                  className="w-full h-full object-cover group-hover/banner:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    Infographic minh họa các cấu phần công nghệ, tính năng thông minh và luồng vận hành thực tế của <strong>{app.name}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E223D] border border-slate-750 space-y-3.5 shadow-md">
            <span className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider block">Tính năng nghiệp vụ nổi bật:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-slate-100">
              {app.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5">
            {app.tags.map((tag, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#0A192F] text-amber-300 border border-slate-700 hover:border-amber-400/40 transition-colors">
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3.5 p-5 sm:px-8 bg-[#0A192F]/95 border-t border-slate-800 backdrop-blur-md">
          <div className="text-xs sm:text-sm text-slate-300 font-mono hidden sm:flex items-center gap-2">
            <span>Tên miền chính: <a href="https://ungdung.vercel.app/" className="text-amber-400 font-bold hover:underline">ungdung.vercel.app</a></span>
            <span className="text-slate-600">•</span>
            <span>Email: <a href="mailto:anhpob@gmail.com" className="text-slate-200 font-semibold hover:text-amber-400">anhpob@gmail.com</a></span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href="mailto:anhpob@gmail.com"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#07111E] hover:bg-[#0E223D] text-slate-200 border border-slate-700 hover:border-amber-400/40 transition-colors"
            >
              <span>anhpob@gmail.com</span>
            </a>

            <a
              href="https://zalo.me/84908095693"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-700/50 transition-colors cursor-pointer"
            >
              <span>Zalo: +84 908095693</span>
            </a>

            <button
              onClick={() => onToggleRequest(app)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isRequested
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                  : 'bg-[#0E223D] hover:bg-[#142C4C] text-amber-300 border border-amber-500/30'
              }`}
            >
              {isRequested ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>+ Thêm yêu cầu</span>
                </>
              )}
            </button>

            {app.userManual && (
              <button
                onClick={() => setIsPdfViewerOpen(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer"
                title={`Đọc & lưu sách hướng dẫn sử dụng PDF (${app.userManual.fileSize})`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Sách HDSD ({app.userManual.fileSize})</span>
              </button>
            )}

            <div className="flex-1 sm:flex-initial flex items-stretch gap-2">
              <a
                href={app.url}
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp(app.url, e)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                title={`Truy cập trực tiếp: ${app.url}`}
              >
                <span>Mở app thực tế ({app.url.replace(/^https?:\/\//, '').replace(/\/$/, '')})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyAppLink}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0E223D] hover:bg-[#142C4C] text-slate-200 border border-slate-700 hover:border-amber-400/40 transition-all cursor-pointer shrink-0"
                title="Sao chép đường link ứng dụng để mở trong trình duyệt khác"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs hidden sm:inline">Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs hidden sm:inline">Chép link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Dedicated PDF Viewer Modal with Sticky Back & Save Buttons */}
      {app.userManual && (
        <PdfViewerModal
          isOpen={isPdfViewerOpen}
          onClose={() => setIsPdfViewerOpen(false)}
          manual={app.userManual}
          appName={app.name}
        />
      )}
    </div>
  );
};
