import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#050B14] border-t border-amber-500/20 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-[#0A192F] border border-amber-400/40 shadow-md shadow-black/50">
              <img 
                src="/brand/logo.jpg" 
                alt="DUY ANH LAB • digital" 
                className="h-11 w-auto object-contain rounded"
              />
              <div className="border-l border-slate-700/60 pl-3.5">
                <div className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">Duy Anh Lab</div>
                <div className="text-xs text-slate-300 font-mono">Real-World Software Engineering</div>
              </div>
            </div>

            <p className="text-slate-300 max-w-md leading-relaxed text-sm sm:text-base">
              Chuyên thiết kế &amp; phát triển các ứng dụng Web chuyên sâu, giải pháp AI và phần mềm thực chiến phục vụ mọi ý tưởng: từ kinh doanh B2B, nghiên cứu R&amp;D, quản lý hộ kinh doanh đến giáo dục học tập và đời sống.
            </p>

            <div className="text-xs text-amber-300/90 font-mono font-bold">
              "MONG MUỐN → Ý TƯỞNG → HIỆN THỰC"
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-extrabold text-amber-300 text-base">Danh Mục Giải Pháp</h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li><a href="#featured" className="text-slate-300 hover:text-amber-300 transition-colors">Ứng dụng tiêu biểu</a></li>
              <li><a href="#apps" className="text-slate-300 hover:text-amber-300 transition-colors">Hệ sinh thái Web &amp; AI</a></li>
              <li><a href="#domains" className="text-slate-300 hover:text-amber-300 transition-colors">Các nhóm ngành trọng điểm</a></li>
              <li><a href="#tech" className="text-slate-300 hover:text-amber-300 transition-colors">Kiến trúc công nghệ</a></li>
            </ul>
          </div>

          {/* Consultation & Support Information */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="font-extrabold text-amber-300 text-base">Tư Vấn &amp; Hiện Thực Hóa</h4>
            <p className="leading-relaxed text-slate-300 text-sm">
              Bạn có ý tưởng trong cuộc sống, kinh doanh, học tập hay công việc cần hiện thực hóa thành ứng dụng Web riêng biệt? Đội ngũ kỹ thuật luôn sẵn sàng đồng hành, tư vấn kiến trúc giải pháp và phát triển sản phẩm thực tế theo yêu cầu riêng của bạn.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-amber-400/90 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Liên hệ tư vấn &amp; trao đổi dự án qua khung liên hệ trực tiếp phía trên</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="text-slate-400">
            © 2026 DUY ANH DIGITAL LAB • <a href="https://ungdung.vercel.app/" className="text-amber-400 font-bold hover:underline">ungdung.vercel.app</a>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-amber-400 text-amber-300 hover:text-slate-950 transition-all border border-amber-400/30 font-bold cursor-pointer text-xs sm:text-sm"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
