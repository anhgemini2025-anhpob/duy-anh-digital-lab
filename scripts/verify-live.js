import https from 'node:https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, length: data.length }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- 1. Kiểm tra trang chủ https://ungdung.vercel.app/ ---');
  const main = await fetchUrl('https://ungdung.vercel.app/');
  console.log('Trang chủ status:', main.status);

  console.log('\n--- 2. Kiểm tra ảnh thật (real-cover.jpg) và Logo của các App ---');
  const testItems = [
    '/apps/cosmederm-ai-academy/real-cover.jpg',
    '/apps/cosmederm-ai-academy/app-logo.png',
    '/apps/foodtech-hub/real-cover.jpg',
    '/apps/foodtech-hub/app-logo.svg',
    '/apps/badminton-management/real-cover.jpg',
    '/apps/badminton-management/app-logo.svg',
    '/apps/htx-rau-cu/real-cover.jpg',
    '/apps/htx-rau-cu/app-logo.png',
    '/apps/quan-ly-hop-dong-abm/real-cover.jpg',
    '/apps/quan-ly-hop-dong-abm/app-logo.png',
    '/apps/uth-scm-navigator/real-cover.jpg',
    '/apps/vet-aqua-erp/real-cover.jpg',
    '/apps/yeast-extract-test/real-cover.jpg',
    '/apps/taxhkd/real-cover.jpg',
    '/apps/taxhkd/app-logo.svg',
    '/apps/cosmederm-ai-academy/illustration-banner.jpg',
    '/apps/algaktiv-advisor/illustration-banner.jpg',
    '/apps/uth-scm-navigator/illustration-banner.jpg',
    '/apps/customer-visit/illustration-banner.jpg',
    '/apps/vet-aqua-erp/illustration-banner.jpg',
    '/brand/logo.jpg'
  ];

  for (const item of testItems) {
    const res = await fetchUrl('https://ungdung.vercel.app' + item);
    console.log(`${item} -> Status: ${res.status} (${res.headers['content-type']}) [${Math.round(res.length/1024)} KB]`);
  }
}

verify().catch(console.error);
