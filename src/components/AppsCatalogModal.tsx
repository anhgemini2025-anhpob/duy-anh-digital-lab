import React, { useEffect } from 'react';
import { X, Layers, Search, Sparkles, ArrowRight, Briefcase, FlaskConical, Utensils, Sprout, Building2, Cpu, Baby } from 'lucide-react';
import { AppItem } from '../data/apps';
import { CATEGORIES } from '../data/categories';
import { FilterBar } from './FilterBar';
import { AppCard } from './AppCard';

interface AppsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grouped' | 'grid';
  onToggleViewMode: (mode: 'grouped' | 'grid') => void;
  onSelectApp: (app: AppItem, initialTab?: 'image' | 'video') => void;
  onToggleRequest: (app: AppItem) => void;
  isAppRequested: (appId: string) => boolean;
}

export const AppsCatalogModal: React.FC<AppsCatalogModalProps> = ({
  isOpen,
  onClose,
  apps,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
  onSelectApp,
  onToggleRequest,
  isAppRequested
}) => {
  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter apps based on category & search query
  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      selectedCategory === 'all' || app.categoryId === selectedCategory;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      app.name.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.problem.toLowerCase().includes(q) ||
      app.solution.toLowerCase().includes(q) ||
      app.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  // Group filtered apps by category
  const domainCategories = CATEGORIES.filter((c) => c.id !== 'all');
  const activeCategories =
    selectedCategory === 'all'
      ? domainCategories
      : domainCategories.filter((c) => c.id === selectedCategory);

  const groupedApps = activeCategories
    .map((category) => {
      const appsInGroup = filteredApps.filter(
        (app) => app.categoryId === category.id
      );
      return {
        category,
        apps: appsInGroup,
      };
    })
    .filter((group) => group.apps.length > 0);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'sales-business':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'ai-education':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'rd-cosmetics':
        return <FlaskConical className="w-5 h-5 text-amber-400" />;
      case 'food-tech':
        return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'agriculture-htx':
        return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'services-clinic':
        return <Building2 className="w-5 h-5 text-rose-400" />;
      case 'lifestyle':
        return <Baby className="w-5 h-5 text-rose-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex flex-col justify-start items-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-7xl bg-[#07111E] border border-amber-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col my-auto max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title, Close Button & Search */}
        <div className="sticky top-0 z-30 bg-[#0B1A2F]/95 backdrop-blur-xl border-b border-slate-700/80 p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#07111E] border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md shrink-0">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Kho Thư Viện 30+ Ứng Dụng Thực Tế
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {filteredApps.length} / {apps.length} Apps
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Khám phá toàn bộ 30+ ứng dụng đã triển khai theo 8 nhóm ngành chuyên sâu, xem hình ảnh thực tế và trải nghiệm trực tiếp.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-[#07111E] hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition-all border border-slate-700 hover:border-amber-400 cursor-pointer shadow-md shrink-0"
              title="Đóng cửa sổ (Phím Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            totalFiltered={filteredApps.length}
            viewMode={viewMode}
            onToggleViewMode={onToggleViewMode}
          />
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-10">
          {filteredApps.length > 0 ? (
            viewMode === 'grouped' ? (
              /* GROUPED VIEW */
              <div className="space-y-12">
                {groupedApps.map((group, gIdx) => (
                  <div key={group.category.id} className="space-y-6">
                    {/* Category Group Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0B1A2F] via-[#0E223D] to-[#07111E] border border-amber-500/30 shadow-md">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#07111E] border border-amber-400/30 flex items-center justify-center shrink-0">
                          {getCategoryIcon(group.category.id)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-black text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                              NHÓM #{String(gIdx + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-white">
                              {group.category.name}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                              {group.apps.length} ứng dụng
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-medium">
                            {group.category.description}
                          </p>
                        </div>
                      </div>

                      {selectedCategory === 'all' && (
                        <button
                          onClick={() => onSelectCategory(group.category.id)}
                          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-[#07111E] hover:bg-amber-400 hover:text-slate-950 border border-amber-400/40 transition-all cursor-pointer shrink-0"
                        >
                          <span>Xem nhóm này</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.apps.map((app) => {
                        const globalIndex = apps.findIndex((a) => a.id === app.id) + 1;
                        return (
                          <AppCard
                            key={app.id}
                            app={app}
                            index={globalIndex}
                            onSelectApp={onSelectApp}
                            onToggleRequest={onToggleRequest}
                            isRequested={isAppRequested(app.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* FLAT GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => {
                  const globalIndex = apps.findIndex((a) => a.id === app.id) + 1;
                  return (
                    <AppCard
                      key={app.id}
                      app={app}
                      index={globalIndex}
                      onSelectApp={onSelectApp}
                      onToggleRequest={onToggleRequest}
                      isRequested={isAppRequested(app.id)}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className="text-center py-16 rounded-3xl bg-[#0B1A2F] border border-slate-700">
              <p className="text-base font-bold text-white">Không tìm thấy ứng dụng phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">Vui lòng thử từ khóa khác hoặc bỏ lọc danh mục.</p>
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onSearchChange('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 shadow-md cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0B1A2F] border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
          <span>Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">ESC</kbd> để đóng cửa sổ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-xs bg-[#07111E] hover:bg-amber-400 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer"
          >
            Đóng kho ứng dụng
          </button>
        </div>

      </div>
    </div>
  );
};
