import React from 'react';
import { Cloud, BrainCircuit, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackItems = [
    {
      category: "AI & Tri Thức Số",
      icon: <BrainCircuit className="w-5 h-5 text-amber-400" />,
      description: "Tích hợp mô hình AI ngôn ngữ lớn (Claude, Gemini, OpenAI) với cơ sở tri thức chuyên ngành và tài liệu kỹ thuật."
    },
    {
      category: "Edge & Cloud Deployment",
      icon: <Cloud className="w-5 h-5 text-amber-400" />,
      description: "Triển khai toàn cầu trên Cloudflare Pages, Workers, Vercel & Netlify với tốc độ tải trang dưới 500ms và uptime 99.9%."
    },
    {
      category: "Front-End Chuẩn Hiện Đại",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      description: "React 18, TypeScript, Tailwind CSS, Vite, Next.js mang lại trải nghiệm mượt mà 60 FPS trên mọi kích thước màn hình."
    },
    {
      category: "Bảo Mật & An Toàn Dữ Liệu",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      description: "Phân quyền vai trò người dùng, mã hóa SSL/TLS tiêu chuẩn, bảo vệ tài nguyên nội bộ và thông tin bản quyền doanh nghiệp."
    }
  ];

  return (
    <section id="tech" className="py-16 sm:py-20 border-b border-amber-500/20 bg-[#07111E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NỀN TẢNG KỸ THUẬT HIỆN ĐẠI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kiến Trúc Đám Mây &amp; Trí Tuệ Nhân Tạo
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Xây dựng trên nền tảng Serverless hiện đại nhất, không phát sinh chi phí duy trì máy chủ cồng kềnh, dễ dàng mở rộng và bảo trì.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0B1A2F] border border-slate-700/80 shadow-md hover:shadow-2xl hover:border-amber-400 hover:bg-[#0E223D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#07111E] border border-slate-700 flex items-center justify-center mb-4 shadow-xs">
                  {item.icon}
                </div>
                <h4 className="text-base font-extrabold text-white mb-2">{item.category}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
