/**
 * Navigation utility for safely opening external links across all platforms:
 * - Desktop browsers: Opens in a new tab (_blank).
 * - Mobile & In-app WebViews (Zalo, Messenger, Facebook, Safari iOS):
 *   Direct top-level navigation so links never get silently blocked by WKWebView popup restrictions.
 */

export const isMobileOrWebview = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod|Android|Zalo|FBAN|FBAV|Instagram|Line|MicroMessenger|Snapchat/i.test(ua);
};

export const openExternalApp = (url: string, e?: React.MouseEvent) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (!url) return;

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isWebview = /Zalo|FBAN|FBAV|Instagram|Line|MicroMessenger|Snapchat|HeyTap|MiuiBrowser/i.test(ua);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

  // In in-app browsers like Zalo or mobile devices, WKWebView silently blocks target="_blank".
  // Navigating via window.location.href guarantees the link opens immediately.
  if (isWebview || isMobile) {
    window.location.href = url;
    return;
  }

  // On desktop: open in new tab with popup blocker fallback
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
};

/**
 * Downloads a file cleanly without navigating away from the web app
 */
export const downloadPdfFile = async (url: string, fileName: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 2000);
    return true;
  } catch (err) {
    console.warn('Direct blob download failed, falling back to anchor click:', err);
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 1000);
      return true;
    } catch {
      return false;
    }
  }
};

