import React, { useState, useMemo } from 'react';
import { APPS_DATA, AppItem } from './data/apps';
import { CATEGORIES } from './data/categories';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { CategoryVisuals } from './components/CategoryVisuals';
import { TechStackSection } from './components/TechStackSection';
import { AppsHubSection } from './components/AppsHubSection';
import { AppsCatalogModal } from './components/AppsCatalogModal';
import { AppDetailModal } from './components/AppDetailModal';
import { RequestDrawer } from './components/RequestDrawer';
import { Footer } from './components/Footer';
import { MessageSquareCode, ArrowRight } from 'lucide-react';
import { openExternalApp, isMobileOrWebview } from './utils/navigation';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [modalTab, setModalTab] = useState<'image' | 'video'>('image');
  const [requestedAppIds, setRequestedAppIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');

  const handleSelectApp = (app: AppItem, tab: 'image' | 'video' = 'image') => {
    setSelectedApp(app);
    setModalTab(tab);
  };

  const openCatalog = (categoryId: string = 'all') => {
    setSelectedCategory(categoryId);
    setIsCatalogOpen(true);
  };

  const requestedApps = useMemo(() => {
    return APPS_DATA.filter((app) => requestedAppIds.includes(app.id));
  }, [requestedAppIds]);

  const toggleRequestApp = (app: AppItem) => {
    setRequestedAppIds((prev) => {
      if (prev.includes(app.id)) {
        return prev.filter((id) => id !== app.id);
      } else {
        return [...prev, app.id];
      }
    });
  };

  const removeRequestedApp = (appId: string) => {
    setRequestedAppIds((prev) => prev.filter((id) => id !== appId));
  };

  const clearAllRequested = () => {
    setRequestedAppIds([]);
  };

  const isAppRequested = (appId: string) => requestedAppIds.includes(appId);

  return (
    <div className="min-h-screen bg-[#07111E] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Header / Navbar */}
      <Navbar
        requestCount={requestedAppIds.length}
        onRequestClick={() => setIsDrawerOpen(true)}
        onExploreClick={() => openCatalog('all')}
      />

      <main>
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => openCatalog('all')}
          onSelectApp={handleSelectApp}
          apps={APPS_DATA}
          featuredApps={APPS_DATA.filter((a) => a.featured)}
        />

        {/* 3. Featured Spotlight Section (5 Nền Tảng Tiêu Biểu - Bố cục cân đối, không khoảng trống) */}
        <FeaturedSection
          apps={APPS_DATA}
          onSelectApp={handleSelectApp}
          onToggleRequest={toggleRequestApp}
          isAppRequested={isAppRequested}
        />

        {/* 4. Domain Competencies Breakdown (Năng Lực Triển Khai Thực Nghiệm Đa Lĩnh Vực) */}
        <CategoryVisuals
          onSelectCategory={(catId) => openCatalog(catId)}
        />

        {/* 5. Cloud Architecture & AI (Kiến Trúc Đám Mây & Trí Tuệ Nhân Tạo) */}
        <TechStackSection />

        {/* 6. Dedicated Interactive Hub Icon for Full Apps Repository (Ngay phía dưới nền tảng đám mây) */}
        <AppsHubSection
          onOpenCatalog={(catId) => openCatalog(catId || 'all')}
          totalAppsCount={APPS_DATA.length}
        />

        {/* 7. Bottom Conversion Banner */}
        <section className="py-16 bg-gradient-to-b from-[#07111E] via-[#0A192F] to-[#07111E] border-b border-amber-500/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <MessageSquareCode className="w-7 h-7 text-slate-950" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bạn Cần Hiện Thực Hóa Ý Tưởng Thành Ứng Dụng Web Riêng Biệt?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Duy Anh Digital Lab nhận phân tích bài toán thực tế, thiết kế giao diện và phát triển hoàn chỉnh giải pháp Web &amp; AI theo yêu cầu riêng của bạn: từ kinh doanh, nghiên cứu đến học tập và đời sống.
            </p>

            {/* Direct Contact Cards */}
            <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="https://zalo.me/84908095693"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
                className="p-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 shadow-md hover:border-amber-400 hover:bg-[#0E223D] transition-all text-center group cursor-pointer"
              >
                <div className="text-xs text-slate-400 font-semibold">Liên hệ Zalo / Hotline:</div>
                <div className="text-base font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5">+84 908095693</div>
              </a>

              <a
                href="mailto:anhpob@gmail.com"
                className="p-3.5 rounded-2xl bg-[#0B1A2F] border border-slate-700 shadow-md hover:border-amber-400 hover:bg-[#0E223D] transition-all text-center group"
              >
                <div className="text-xs text-slate-400 font-semibold">Email trao đổi dự án:</div>
                <div className="text-base font-extrabold text-amber-400 group-hover:text-amber-300 mt-0.5">anhpob@gmail.com</div>
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 shadow-xl shadow-amber-500/25 transition-all cursor-pointer"
              >
                <span>Mở danh sách yêu cầu ({requestedAppIds.length})</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => openCatalog('all')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1A2F] border border-amber-400/40 hover:border-amber-400 hover:bg-[#0E223D] hover:text-amber-300 transition-all shadow-md cursor-pointer"
              >
                <span>Xem toàn bộ kho {APPS_DATA.length}+ ứng dụng</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 8. Footer */}
      <Footer />

      {/* 9. Interactive Apps Catalog Modal (Mở ra khi nhấn Icon Kho Ứng Dụng bên dưới nền tảng đám mây) */}
      <AppsCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        apps={APPS_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onSelectApp={handleSelectApp}
        onToggleRequest={toggleRequestApp}
        isAppRequested={isAppRequested}
      />

      {/* 10. Interactive App Detail Modal */}
      {selectedApp && (
        <AppDetailModal
          key={selectedApp.id}
          app={selectedApp}
          allApps={APPS_DATA}
          onSelectApp={handleSelectApp}
          initialTab={modalTab}
          onClose={() => setSelectedApp(null)}
          onToggleRequest={toggleRequestApp}
          isRequested={isAppRequested(selectedApp.id)}
        />
      )}

      {/* 11. Consultation & Quote Request Drawer */}
      <RequestDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        requestedApps={requestedApps}
        onRemoveApp={removeRequestedApp}
        onClearAll={clearAllRequested}
      />

    </div>
  );
}
export default App;
