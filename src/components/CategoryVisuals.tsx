import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Sparkles, FlaskConical, Utensils, Briefcase, Sprout, Building2, Cpu, ArrowRight, Baby, HeartPulse } from 'lucide-react';

interface CategoryVisualsProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryVisuals: React.FC<CategoryVisualsProps> = ({ onSelectCategory }) => {
  const domainList = CATEGORIES.filter(c => c.id !== 'all');

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'lifestyle': return <Baby className="w-5 h-5 text-amber-400" />;
      case 'healthcare': return <HeartPulse className="w-5 h-5 text-amber-400" />;
      case 'ai-education': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'rd-cosmetics': return <FlaskConical className="w-5 h-5 text-amber-400" />;
      case 'food-tech': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'sales-business': return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'agriculture-htx': return <Sprout className="w-5 h-5 text-amber-400" />;
      case 'services-clinic': return <Building2 className="w-5 h-5 text-amber-400" />;
      default: return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="domains" className="py-16 sm:py-20 border-b border-amber-500/20 bg-[#07111E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>8 KHỐI NGÀNH CHUYÊN SÂU • 20+ ỨNG DỤNG THỰC TẾ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Năng Lực Triển Khai Thực Nghiệm Đa Lĩnh Vực
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Hệ sinh thái gồm 8 nhóm ngành chuyên sâu: Sức khỏe &amp; Y tế, Đời sống, Nông nghiệp &amp; SCM, Food Tech &amp; F&amp;B, R&amp;D Mỹ phẩm, Quản trị B2B, AI Đào tạo và Dịch vụ Clinic. Mỗi hệ thống được thiết kế riêng biệt dựa trên thực tiễn sản xuất và trải nghiệm người dùng thực địa.
          </p>
        </div>

        {/* 7 Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domainList.map((domain) => (
            <div
              key={domain.id}
              onClick={() => {
                onSelectCategory(domain.id);
              }}
              className="group relative p-6 rounded-3xl bg-[#0B1A2F] border border-slate-700/80 hover:border-amber-400 hover:bg-[#0E223D] transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#07111E] border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-400/50 shadow-xs transition-all">
                    {getDomainIcon(domain.id)}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#07111E] border border-amber-400/30 text-amber-300 shadow-xs">
                    {domain.count} Ứng dụng
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {domain.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>Khám phá danh mục</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
