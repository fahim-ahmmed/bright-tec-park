import { FirecrawlClient } from '@mendable/firecrawl-js';

const DEFAULT_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Only allow http(s) URLs and block loopback/private targets (SSRF guard for the fallback fetch).
function isSafePublicUrl(u) {
  try {
    const url = new URL(u);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    const h = url.hostname.toLowerCase();
    if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal')) return false;
    if (/^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|::1|\[::1\])/.test(h)) return false;
    return true;
  } catch { return false; }
}

export async function runFirecrawlAgent({ prompt, urls, schema, model, maxCredits }) {
  const started = Date.now();
  const apiKey = process.env.FIRECRAWL_API_KEY;
  const targets = (urls?.length ? urls : [DEFAULT_URL]).filter(isSafePublicUrl);
  if (!targets.length) return { success: false, status: 'failed', error: 'URL must be a public http(s) address.', executionTimeMs: 0, data: null };
  const primary = targets[0];

  if (apiKey && apiKey !== 'fc-YOUR_API_KEY') {
    try {
      const client = new FirecrawlClient({ apiKey });
      const res = await client.agent({ prompt: prompt || 'Extract institute overview, courses, fees and contact details', urls: targets, schema, model: model || 'spark-2', maxCredits: maxCredits || 50 });
      return { success: true, status: 'completed', source: 'firecrawl_cloud', targetUrl: primary, data: res?.data || res?.result || res, executionTimeMs: Date.now() - started };
    } catch (err) {
      console.warn('Firecrawl cloud agent failed, falling back:', err?.message || err);
    }
  }

  try {
    const r = await fetch(primary, { headers: { 'User-Agent': 'BengalInstituteAgent/1.0' }, signal: AbortSignal.timeout(15000) });
    const html = await r.text();
    const pick = (re) => (html.match(re) || [])[1]?.trim() || '';
    const phones = Array.from(new Set(html.match(/01[3-9]\d{2}[-\s]?\d{6}/g) || []));
    return {
      success: true, status: 'fallback_completed', source: 'live_fetch_fallback', targetUrl: primary, executionTimeMs: Date.now() - started,
      summary: 'Basic live extraction (title/description/phones). Set FIRECRAWL_API_KEY for the full spark-2 agent.',
      data: {
        title: pick(/<title[^>]*>([^<]+)<\/title>/i),
        description: pick(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i),
        ogTitle: pick(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i),
        phones, agentPrompt: prompt, crawledAt: new Date().toISOString(), pageLength: html.length,
      },
    };
  } catch (err) {
    return { success: false, status: 'failed', source: 'live_fetch_fallback', targetUrl: primary, data: null, error: err?.message || 'Failed to fetch URL', executionTimeMs: Date.now() - started };
  }
}
