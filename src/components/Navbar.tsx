import React from 'react';
import { Layers, ShoppingBag, Sparkles, Phone, Mail, Flame, Sun, Moon } from 'lucide-react';
import { openExternalApp, isMobileOrWebview } from '../utils/navigation';

interface NavbarProps {
  requestCount: number;
  onRequestClick: () => void;
  onExploreClick: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  requestCount,
  onRequestClick,
  onExploreClick,
  theme = 'light',
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07111E]/95 border-b border-amber-500/20 transition-all shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-12 px-2.5 py-1 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-md shadow-black/50 flex items-center group-hover:border-amber-400 transition-all shrink-0">
              <img 
                src="/brand/logo.jpg" 
                alt="DUY ANH LAB • digital" 
                className="h-9 w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base lg:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  DUY ANH LAB
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 tracking-wider">
                  DIGITAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Hệ sinh thái Web App chuyên sâu &amp; giải pháp AI • ungdung.vercel.app
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 text-sm font-semibold text-slate-300">
            {/* 1. Newest App Spotlight Pill: VietGo AI */}
            <a 
              href="#vietgo-showcase" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-sky-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
              title="Khám phá ứng dụng mới: VietGo AI — Giao Nhận Hàng & Mua Hộ Hai Chiều Việt – Mỹ"
            >
              <Flame className="w-3.5 h-3.5 text-slate-950 fill-current" />
              <span>App Mới: VietGo AI</span>
              <Sparkles className="w-3 h-3 text-slate-950" />
            </a>

            {/* 2. App Spotlight: VietEcom */}
            <a 
              href="#vietecom-showcase" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-amber-400 text-xs"
              title="Khám phá ứng dụng: VietEcom — AI Business Copilot Cho Người Bán Hàng Online"
            >
              <span>VietEcom</span>
            </a>

            {/* 3. Spotlight: VietThrive */}
            <a 
              href="#vietthrive-showcase" 
              className="hover:text-teal-300 transition-colors flex items-center gap-1 font-bold text-teal-400 text-xs"
              title="Khám phá: VietThrive — Vào Đời & Phát Triển Sự Nghiệp (18–25 tuổi)"
            >
              <span>VietThrive</span>
            </a>

            {/* 3. Viethome AI */}
            <a 
              href="#viethome-showcase" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-amber-400 text-xs"
              title="Khám phá: Viethome AI - Quản lý thi công & Dự toán nhà phố"
            >
              <span>Viethome AI</span>
            </a>

            {/* 4. VietTutorz */}
            <a 
              href="#viettutorz-showcase" 
              className="hover:text-sky-300 transition-colors flex items-center gap-1 font-bold text-sky-400 text-xs"
              title="Khám phá gia sư AI: VietTutorz Lớp 1-12"
            >
              <span>VietTutorz</span>
            </a>

            {/* 5. VietNail Guide */}
            <a 
              href="#vietnail-showcase" 
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-amber-400 text-xs"
              title="Khám phá cẩm nang nghề: VietNail Guide AI"
            >
              <span>VietNail</span>
            </a>

            <a href="#featured" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiêu biểu</span>
            </a>
            <a href="#apps" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Kho App</span>
            </a>
          </nav>

          {/* Contact Badges, Theme Toggle & Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* THEME TOGGLE BUTTON (Màn hình Sáng / Tối) */}
            <button
              onClick={onToggleTheme}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-[#0E223D] hover:bg-[#142C4C] border-slate-700 text-amber-300'
              }`}
              title={theme === 'light' ? 'Chuyển sang Chế độ Tối (Dark Navy Luxury)' : 'Chuyển sang Chế độ Sáng (Crisp Light Mode)'}
              aria-label="Chuyển chế độ sáng tối"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                  <span className="hidden sm:inline font-bold">Chế độ Tối</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                  <span className="hidden sm:inline font-bold">Chế độ Sáng</span>
                </>
              )}
            </button>

            {/* Direct Email */}
            <a
              href="mailto:anhpob@gmail.com"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 bg-[#0E223D] border border-slate-700 hover:border-amber-400/50 hover:text-amber-300 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>anhpob@gmail.com</span>
            </a>

            {/* Direct Zalo / Phone Badge */}
            <a
              href="https://zalo.me/84908095693"
              target={isMobileOrWebview() ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 hover:border-amber-400 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Zalo: +84 908095693</span>
            </a>

            {/* Consultation Request Button */}
            <button
              onClick={onRequestClick}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>Yêu cầu tư vấn</span>
              {requestCount > 0 ? (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black bg-slate-950 text-amber-300 rounded-full animate-bounce border border-amber-400/40">
                  {requestCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
