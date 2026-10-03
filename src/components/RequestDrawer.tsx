import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Send, Copy, Check, MessageSquare, Mail, Sparkles, Building, Phone, User, ExternalLink, Printer, FileText, AlertCircle, FileDown, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AppItem } from '../data/apps';
import { openExternalApp, isMobileOrWebview } from '../utils/navigation';

interface RequestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  requestedApps: AppItem[];
  onRemoveApp: (appId: string) => void;
  onClearAll: () => void;
}

export const RequestDrawer: React.FC<RequestDrawerProps> = ({
  isOpen,
  onClose,
  requestedApps,
  onRemoveApp,
  onClearAll
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const nameInputRef = React.useRef<HTMLInputElement | null>(null);
  const phoneInputRef = React.useRef<HTMLInputElement | null>(null);
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);

  // Validation rules: Name >= 2 chars, Phone 8-15 digits, Email valid pattern
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = /^[0-9+\s().-]{8,15}$/.test(phone.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFormValid = isNameValid && isPhoneValid && isEmailValid;

  if (!isOpen) return null;

  const focusMissingField = () => {
    if (!isNameValid) {
      nameInputRef.current?.focus();
    } else if (!isPhoneValid) {
      phoneInputRef.current?.focus();
    } else if (!isEmailValid) {
      emailInputRef.current?.focus();
    }
  };

  const generateSummaryText = () => {
    const appList = requestedApps.map((a, i) => `${i + 1}. [${a.name}] (${a.category}) - ${a.url}`).join('\n');
    return `KÍNH GỬI DUY ANH DIGITAL LAB - YÊU CẦU TƯ VẤN & BÁO GIÁ GIẢI PHÁP
--------------------------------------------------
Khách hàng / Doanh nghiệp: ${name.trim()}
Số điện thoại / Zalo: ${phone.trim()}
Email: ${email.trim()}

DANH SÁCH ỨNG DỤNG QUAN TÂM (${requestedApps.length} ứng dụng):
${appList}

YÊU CẦU CỤ THỂ / GHI CHÚ DỰ ÁN:
${note.trim() || 'Tôi muốn được tư vấn xây dựng hệ thống tương tự hoặc tích hợp các tính năng trên cho mô hình của tôi.'}
--------------------------------------------------
Gửi từ Duy Anh Digital Lab (ungdung.vercel.app)`;
  };

  const handleCopy = () => {
    if (!isFormValid) {
      setShowValidationWarning(true);
      focusMissingField();
      return;
    }
    setShowValidationWarning(false);
    const text = generateSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = () => {
    if (!isFormValid) {
      setShowValidationWarning(true);
      focusMissingField();
      return;
    }
    setShowValidationWarning(false);
    const subject = encodeURIComponent(`[Duy Anh Digital Lab] Yêu cầu tư vấn ${requestedApps.length} giải pháp phần mềm - ${name.trim()}`);
    const body = encodeURIComponent(generateSummaryText());
    window.open(`mailto:anhpob@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!isFormValid) {
      setShowValidationWarning(true);
      focusMissingField();
      return;
    }
    setShowValidationWarning(false);
    setIsGeneratingPDF(true);
    setDownloadSuccess(false);

    try {
      const printElement = document.getElementById('printable-order-sheet');
      if (!printElement) {
        throw new Error('Printable element not found');
      }

      // Render crisp canvas
      const canvas = await html2canvas(printElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 mm
      const pageHeight = 297; // A4 mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const safeName = (name.trim() || 'Khach_Hang').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
      pdf.save(`Phieu_Yeu_Cau_Giai_Phap_${safeName}.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('PDF export error:', err);
      // Fallback directly to native print dialog on active page
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDirectPrint = () => {
    if (!isFormValid) {
      setShowValidationWarning(true);
      focusMissingField();
      return;
    }
    setShowValidationWarning(false);
    // Triggers native print dialog / AirPrint directly on current window without opening blank tabs!
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07111E] border-l border-amber-500/30 shadow-2xl flex flex-col text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0A192F]">
            <div className="flex items-center gap-3">
              <div className="h-10 px-2 py-0.5 rounded-xl bg-[#0A192F] border border-amber-400/40 flex items-center shrink-0 shadow-xs">
                <img 
                  src="/brand/logo.jpg" 
                  alt="DUY ANH LAB" 
                  className="h-7 w-auto object-contain rounded"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm sm:text-base">Khay Yêu Cầu Giải Pháp</h3>
                <p className="text-[11px] text-slate-400">
                  Đã chọn {requestedApps.length} ứng dụng mẫu bạn quan tâm
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0E223D]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Banner inside Drawer */}
          <div className="px-4 py-2 bg-[#0E223D] border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Tư vấn trực tiếp:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://zalo.me/84908095693"
                target={isMobileOrWebview() ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
                className="font-bold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                +84 908095693
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="mailto:anhpob@gmail.com"
                className="font-bold text-amber-300 hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                anhpob@gmail.com
              </a>
            </div>
          </div>

          {/* Content: Selected Apps list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 pb-16">
            {requestedApps.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white">Bạn chưa chọn ứng dụng nào.</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Hãy bấm nút <strong>"+ Thêm vào yêu cầu"</strong> ở bất kỳ thẻ ứng dụng nào để gom thành danh sách tư vấn.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>DANH SÁCH ĐÃ CHỌN ({requestedApps.length})</span>
                  <button
                    onClick={onClearAll}
                    className="text-red-400 hover:text-red-300 font-bold cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                </div>

                <div className="space-y-2.5">
                  {requestedApps.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0B1A2F] border border-slate-700/80"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800 shadow-2xs">
                          <img
                            src={app.coverImage}
                            alt={app.name}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== app.placeholderImage) {
                                target.src = app.placeholderImage;
                              }
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-white truncate">{app.name}</h4>
                          <span className="text-[10px] text-amber-300 font-semibold truncate block">{app.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveApp(app.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-[#0E223D] shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Contact Form */}
                <div className="pt-4 border-t border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block">
                      Thông tin liên hệ của bạn:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (<span className="text-red-400 font-bold">*</span> Bắt buộc để In &amp; Tải PDF)
                    </span>
                  </div>

                  {/* Họ tên / Doanh nghiệp */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between mb-1">
                      <span>Họ tên / Doanh nghiệp <span className="text-red-400 font-black">*</span></span>
                      {name.trim() && (
                        isNameValid 
                          ? <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> Hợp lệ</span>
                          : <span className="text-amber-400 text-[10px]">Tối thiểu 2 ký tự</span>
                      )}
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (showValidationWarning) setShowValidationWarning(false);
                      }}
                      placeholder="Nguyễn Văn A - Công ty XYZ"
                      className={`w-full px-3 py-2 rounded-xl bg-[#0E223D] border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                        showValidationWarning && !isNameValid
                          ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                          : isNameValid
                            ? 'border-emerald-500/50 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                  </div>

                  {/* Số điện thoại / Zalo */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between mb-1">
                      <span>Số điện thoại / Zalo <span className="text-red-400 font-black">*</span></span>
                      {phone.trim() && (
                        isPhoneValid 
                          ? <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> Hợp lệ</span>
                          : <span className="text-amber-400 text-[10px]">Từ 8 - 15 chữ số</span>
                      )}
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (showValidationWarning) setShowValidationWarning(false);
                      }}
                      placeholder="090x xxx xxx"
                      className={`w-full px-3 py-2 rounded-xl bg-[#0E223D] border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                        showValidationWarning && !isPhoneValid
                          ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                          : isPhoneValid
                            ? 'border-emerald-500/50 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between mb-1">
                      <span>Email trao đổi dự án <span className="text-red-400 font-black">*</span></span>
                      {email.trim() && (
                        isEmailValid 
                          ? <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> Hợp lệ</span>
                          : <span className="text-amber-400 text-[10px]">Email không hợp lệ</span>
                      )}
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (showValidationWarning) setShowValidationWarning(false);
                      }}
                      placeholder="email@example.com"
                      className={`w-full px-3 py-2 rounded-xl bg-[#0E223D] border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                        showValidationWarning && !isEmailValid
                          ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                          : isEmailValid
                            ? 'border-emerald-500/50 focus:border-emerald-400'
                            : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Ghi chú nhu cầu triển khai <span className="text-slate-400 font-normal text-[10px] ml-1">(Tùy chọn)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Cần xây dựng phần mềm tương tự nhưng cho ngành thực phẩm..."
                      className="w-full px-3 py-2 rounded-xl bg-[#0E223D] border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {requestedApps.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0A192F] space-y-2 shrink-0">
              
              {/* Validation Status Notice with Dismiss / Close (X) Button */}
              {showValidationWarning && !isFormValid && (
                <div className="p-2.5 rounded-xl border border-red-500/80 bg-red-950/95 text-red-200 text-[11px] flex items-start gap-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <strong className="block font-bold text-red-300">
                      Chưa đủ thông tin bắt buộc (*):
                    </strong>
                    <span>
                      {!isNameValid 
                        ? 'Vui lòng điền Họ tên / Doanh nghiệp.' 
                        : !isPhoneValid 
                          ? 'Vui lòng điền Số điện thoại / Zalo hợp lệ.' 
                          : 'Vui lòng điền Email để mở khóa in & tải file PDF.'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowValidationWarning(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-red-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-1"
                    title="Tắt thông báo cảnh báo này"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {isFormValid && (
                <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-[11px] flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold">Đã nhập đủ thông tin — Sẵn sàng In &amp; Tải File PDF!</span>
                </div>
              )}

              {/* Primary Action: Download Real PDF File */}
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isGeneratingPDF
                    ? 'bg-amber-500/80 text-slate-950 cursor-wait'
                    : isFormValid
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/25 hover:scale-[1.01]'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-amber-400/50'
                }`}
                title={isFormValid ? "Bấm để tải file PDF về điện thoại hoặc máy tính" : "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email để tải file PDF"}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                    <span>Đang kết xuất file PDF chất lượng cao...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Đã tải file PDF thành công!</span>
                  </>
                ) : (
                  <>
                    <FileDown className={`w-4 h-4 ${isFormValid ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{isFormValid ? 'Tải File PDF (.pdf) Yêu Cầu' : 'Tải File PDF (Cần nhập đủ thông tin *)'}</span>
                  </>
                )}
              </button>

              {/* Secondary Row: Direct Print & Copy */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDirectPrint}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isFormValid
                      ? 'bg-[#0E223D] hover:bg-[#142C4C] text-amber-300 border-amber-400/40 hover:border-amber-400'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                  title="In trực tiếp qua máy in hoặc AirPrint trên điện thoại (không mở tab trắng)"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Phiếu (AirPrint)</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-[#0E223D] hover:bg-[#142C4C] text-white transition-all border border-slate-700 shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Sao chép tóm tắt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Contact Row: Zalo & Email */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://zalo.me/84908095693"
                  target={isMobileOrWebview() ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={(e) => openExternalApp('https://zalo.me/84908095693', e)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0E223D] hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-400/30 transition-all text-center cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat Zalo ngay</span>
                </a>

                <button
                  onClick={handleSendEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0E223D] hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-400/30 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gửi Email</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-tight pt-0.5">
                * Bấm <strong>"Tải File PDF"</strong> để lưu tệp gửi qua Zalo / Email, hoặc <strong>"In Phiếu"</strong> để in nhanh qua AirPrint.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Hidden / Offscreen printable order sheet rendered via Portal into body */}
      {requestedApps.length > 0 && createPortal(
        <div
          id="printable-order-sheet"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '794px',
            minHeight: '1123px',
            padding: '36px 40px',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: 1.5,
            zIndex: -9999,
            pointerEvents: 'none'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
                  DUY ANH LAB
                </span>
                <span style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                  DIGITAL
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                Hệ sinh thái Web Applications &amp; AI Systems Chuyên Ngành
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#475569', textAlign: 'right', lineHeight: '1.6' }}>
              <div><strong>Hotline / Zalo:</strong> +84 908095693</div>
              <div><strong>Email:</strong> anhpob@gmail.com</div>
              <div><strong>Website:</strong> ungdung.vercel.app</div>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
              Phiếu Yêu Cầu Tư Vấn &amp; Báo Giá Giải Pháp
            </h1>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Thời điểm lập: {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} • Số lượng giải pháp quan tâm: {requestedApps.length} ứng dụng
            </div>
          </div>

          {/* Info Box */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <tbody>
                <tr>
                  <td style={{ width: '32%', padding: '4px 0', fontWeight: 'bold', color: '#475569' }}>Khách hàng / Doanh nghiệp:</td>
                  <td style={{ width: '68%', padding: '4px 0', color: '#0f172a', fontWeight: 600 }}>{name || 'Chưa cung cấp'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', fontWeight: 'bold', color: '#475569' }}>Số điện thoại / Zalo:</td>
                  <td style={{ padding: '4px 0', color: '#0f172a', fontWeight: 600 }}>{phone || 'Chưa cung cấp'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', fontWeight: 'bold', color: '#475569' }}>Email trao đổi:</td>
                  <td style={{ padding: '4px 0', color: '#0f172a', fontWeight: 600 }}>{email || 'Chưa cung cấp'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '11px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                <th style={{ width: '6%', textAlign: 'center', padding: '8px 6px', fontWeight: 'bold' }}>STT</th>
                <th style={{ width: '34%', textAlign: 'left', padding: '8px 10px', fontWeight: 'bold' }}>ỨNG DỤNG MẪU</th>
                <th style={{ width: '22%', textAlign: 'left', padding: '8px 8px', fontWeight: 'bold' }}>NHÓM NGÀNH</th>
                <th style={{ width: '38%', textAlign: 'left', padding: '8px 10px', fontWeight: 'bold' }}>MÔ TẢ GIẢI PHÁP</th>
              </tr>
            </thead>
            <tbody>
              {requestedApps.map((app, index) => (
                <tr key={app.id || index} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ textAlign: 'center', padding: '10px 6px', fontWeight: 'bold', color: '#64748b' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#0f172a' }}>{app.name}</div>
                    <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>{app.url}</div>
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                      {app.category}
                    </span>
                  </td>
                  <td style={{ padding: '10px 10px', color: '#475569', lineHeight: 1.4 }}>
                    {app.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Note Box */}
          <div style={{ border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
              Nội dung yêu cầu cụ thể / Ghi chú dự án:
            </div>
            <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {note || 'Tôi quan tâm đến các giải pháp phần mềm trên và muốn được tư vấn xây dựng, điều chỉnh nghiệp vụ phù hợp với mô hình của doanh nghiệp tôi.'}
            </div>
          </div>

          {/* Footer Note */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '10px', color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
            <div>Phiếu yêu cầu được tạo tự động từ <strong>Duy Anh Digital Lab</strong> (https://ungdung.vercel.app/).</div>
            <div>Quý khách có thể gửi file PDF này trực tiếp qua Zalo <strong>+84 908095693</strong> hoặc Email <strong>anhpob@gmail.com</strong> để nhận phản hồi và báo giá nhanh nhất.</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
