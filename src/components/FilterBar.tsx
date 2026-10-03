import React from 'react';
import { Search, X, FolderTree, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFiltered: number;
  viewMode?: 'grouped' | 'grid';
  onToggleViewMode?: (mode: 'grouped' | 'grid') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalFiltered,
  viewMode = 'grouped',
  onToggleViewMode
}) => {
  return (
    <div className="space-y-6">
      {/* Top Filter Controls: Search & Category Chips */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tên app (Thuế HKD, CosmeDerm, Sales, Hợp đồng, R&D...)"
            className="w-full pl-12 pr-11 py-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 transition-all shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Counter Badge */}
        <div className="flex items-center gap-3 self-end lg:self-center flex-wrap">
          {onToggleViewMode && (
            <div className="flex items-center bg-[#0B1A2F] border border-slate-700/80 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => onToggleViewMode('grouped')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Sắp xếp danh mục theo từng nhóm chuyên ngành"
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>Theo nhóm ngành</span>
              </button>

              <button
                onClick={() => onToggleViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Hiển thị toàn bộ dưới dạng lưới tổng hợp"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Tất cả dạng lưới</span>
              </button>
            </div>
          )}

          {/* Counter Badge */}
          <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
            <span className="font-extrabold text-slate-200 hidden sm:inline">KẾT QUẢ:</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/40 font-black text-amber-300 text-sm sm:text-base">
              {totalFiltered} Ứng dụng
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm sm:text-base font-extrabold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20 border border-amber-400 scale-[1.02]'
                  : 'bg-[#0B1A2F] text-slate-200 hover:bg-[#0E223D] hover:text-white border border-slate-700/80 hover:border-amber-400/60 shadow-xs'
              }`}
            >
              <span>{cat.shortName}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
                isActive ? 'bg-slate-950 text-amber-300' : 'bg-[#0E223D] text-slate-300'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
