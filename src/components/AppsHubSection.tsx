import React from 'react';
import { Layers, Sparkles, ArrowRight, FolderKanban, Search, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface AppsHubSectionProps {
  onOpenCatalog: (categoryId?: string) => void;
  totalAppsCount: number;
}

export const AppsHubSection: React.FC<AppsHubSectionProps> = ({
  onOpenCatalog,
  totalAppsCount
}) => {
  const domainCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section id="apps" className="py-16 sm:py-24 bg-gradient-to-b from-[#07111E] via-[#091527] to-[#07111E] border-b border-amber-500/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs sm:text-sm font-bold text-amber-300 mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>THƯ VIỆN SỐ HÓA • TOÀN BỘ 30+ DỰ ÁN</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Kho Ứng Dụng Đã Thực Hiện
        </h2>
        
        <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          Toàn bộ các ứng dụng đã được quy hoạch gọn gàng theo <strong>9 nhóm ngành chuyên sâu</strong> ở trên. Nhấn vào biểu tượng bên dưới để mở toàn bộ kho lưu trữ <strong>30+ ứng dụng thực tế</strong>.
        </p>

        {/* Dedicated Main Interactive Icon & Trigger Card */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div
            onClick={() => onOpenCatalog('all')}
            className="group relative p-8 sm:p-10 rounded-3xl bg-[#0B1A2F]/90 hover:bg-[#0E223D] border-2 border-amber-400/40 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer text-center"
          >
            {/* Glowing Accent Ring */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl blur-md opacity-20 group-hover:opacity-60 transition duration-500 -z-10" />

            {/* Radiant Interactive Central Icon */}
            <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-2xl shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-[#07111E] flex flex-col items-center justify-center gap-1 group-hover:bg-[#0A192F] transition-colors">
                <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono font-black text-amber-300 tracking-wider">
                  30+ APPS
                </span>
              </div>
            </div>

            {/* Call to Action Text */}
            <h3 className="text-xl sm:text-2xl font-black text-white mt-6 group-hover:text-amber-300 transition-colors">
              Mở Kho Thư Viện 30+ Ứng Dụng Thực Tế
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Bao gồm thanh tìm kiếm nhanh, lọc theo 9 nhóm ngành, xem ảnh chụp thực tế màn hình, video tour và liên kết trải nghiệm trực tiếp.
            </p>

            {/* Button */}
            <div className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 group-hover:scale-105 transition-all">
              <FolderKanban className="w-5 h-5 text-slate-950" />
              <span>Khám phá toàn bộ 30+ Ứng dụng</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Quick Category Jump Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono text-slate-400 font-bold mr-1">
            Lọc nhanh theo nhóm:
          </span>
          {domainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onOpenCatalog(cat.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-[#0A192F] border border-slate-700/80 hover:border-amber-400 hover:text-amber-300 hover:bg-[#0E223D] transition-all cursor-pointer shadow-xs"
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
