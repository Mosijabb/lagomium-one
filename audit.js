/**
 * Lagomium SEO Audit Engine — Cloudflare Pages Function
 * POST /api/audit  { url: string, pagespeedKey?: string }
 *
 * No npm dependencies. Uses fetch() + HTMLRewriter (CF native).
 * Deploy: add this file to your lagomium.com CF Pages repo at functions/api/audit.js
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  'the','a','an','and','or','but','is','are','was','were','be','been','being',
  'to','of','in','on','at','for','with','by','from','as','this','that','these',
  'those','it','its','you','your','we','our','they','their','he','she','his',
  'her','not','no','so','if','than','then','also','can','will','just','about',
  'into','out','up','down','over','under','more','most','some','such','only',
  'own','same','too','very','now','all','any','both','each','other','have','has',
  'had','do','does','did','what','which','who','when','where','why','how',
]);

const THIRD_PARTY = {
  'googletagmanager.com': 'Google Tag Manager',
  'google-analytics.com': 'Google Analytics',
  'connect.facebook.net': 'Facebook Pixel',
  'hotjar.com': 'Hotjar',
  'clarity.ms': 'Microsoft Clarity',
  'intercom.io': 'Intercom',
  'tawk.to': 'Tawk.to Chat',
  'crisp.chat': 'Crisp Chat',
  'hs-scripts.com': 'HubSpot',
  'klaviyo.com': 'Klaviyo',
  'cdn.shopify.com': 'Shopify CDN',
  'tiktok.com': 'TikTok Pixel',
  'linkedin.com': 'LinkedIn Insight Tag',
  'doubleclick.net': 'Google Ads (DoubleClick)',
  'recaptcha': 'Google reCAPTCHA',
  'cookiebot': 'Cookiebot CMP',
  'onetrust': 'OneTrust CMP',
  'typekit.net': 'Adobe Fonts',
  'fonts.googleapis.com': 'Google Fonts',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ─── CF Pages Function exports ────────────────────────────────────────────────

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const rawUrl = (body.url || '').trim().replace(/\/+$/, '');
    const bodyPsiKey = (body.pagespeedKey || '').trim();

    if (!rawUrl) return jsonResp({ error: 'URL is required.' }, 400);

    const fullUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    let parsed;
    try { parsed = new URL(fullUrl); }
    catch (e) { return jsonResp({ error: 'Invalid URL format.' }, 400); }

    const psiKey = bodyPsiKey || (env?.GOOGLE_PAGESPEED_API_KEY ?? '');
    return jsonResp(await runAudit(fullUrl, parsed, psiKey));
  } catch (e) {
    console.error('[audit] fatal:', e);
    return jsonResp({ error: e.message }, 500);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function normalizeUrl(u) {
  return (u || '').replace(/^https?:\/\/(www\.)?/i, '').replace(/\/+$/, '').toLowerCase();
}

function detectCms(html, generator) {
  if (/wp-content|wp-includes/i.test(html)) return 'WordPress';
  if (/cdn\.shopify\.com|Shopify\.theme/i.test(html)) return 'Shopify';
  if (/static\.wixstatic\.com|wixsite\.com/i.test(html)) return 'Wix';
  if (/squarespace\.com|sqsp\b/i.test(html)) return 'Squarespace';
  if (/data-wf-page|webflow\.com/i.test(html)) return 'Webflow';
  if (/ghost\.org|ghost-theme/i.test(html)) return 'Ghost';
  if (/framer\.com|framer-motion/i.test(html)) return 'Framer';
  if (generator) return generator.split(' ').slice(0, 3).join(' ');
  return 'Custom / Unknown';
}

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  const m = clean.match(/[aeiouy]+/g);
  let n = m ? m.length : 1;
  if (clean.endsWith('e') && n > 1) n--;
  return Math.max(n, 1);
}

function analyzeReadability(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length || !sentences.length) return { fleschScore: null, gradeLevel: 'Not enough text' };
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const score = 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
  const s = Math.round(score * 10) / 10;
  const grade =
    s >= 90 ? '5th grade (Very Easy)' :
    s >= 80 ? '6th grade (Easy)' :
    s >= 70 ? '7th grade (Fairly Easy)' :
    s >= 60 ? '8th–9th grade (Standard)' :
    s >= 50 ? '10th–12th grade (Difficult)' :
    s >= 30 ? 'College Level (Very Difficult)' : 'Graduate Level';
  return { fleschScore: s, gradeLevel: grade };
}

function topKeywords(text, limit = 10) {
  const words = (text.toLowerCase().match(/[a-z']{3,}/g) || []);
  const freq = {};
  for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({
      word, count,
      density: ((count / words.length) * 100).toFixed(1) + '%',
    }));
}

async function checkRobotsTxt(parsed) {
  try {
    const res = await fetch(`${parsed.protocol}//${parsed.hostname}/robots.txt`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(6000),
    });
    if (res.status !== 200) return { found: false };
    const text = await res.text();
    return {
      found: true,
      sitemapDeclared: /sitemap:/i.test(text),
      disallowCount: (text.match(/disallow:/gi) || []).length,
      raw: text.slice(0, 500),
    };
  } catch (e) { return { found: false }; }
}

async function checkSitemap(parsed) {
  for (const p of ['/sitemap.xml', '/sitemap_index.xml', '/wp-sitemap.xml']) {
    try {
      const res = await fetch(`${parsed.protocol}//${parsed.hostname}${p}`, {
        redirect: 'follow',
        signal: AbortSignal.timeout(6000),
      });
      if (res.status === 200) {
        const text = await res.text();
        const count = (text.match(/<loc>/gi) || []).length;
        if (count > 0) return { found: true, path: p, urlCount: count };
      }
    } catch (e) { /* continue */ }
  }
  return { found: false };
}

async function fetchPageSpeed(url, key) {
  const apiUrl =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(url)}&key=${key}&category=performance&strategy=mobile`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  const lh = data.lighthouseResult;
  const audits = lh.audits;
  const lcpMs = Math.round(audits['largest-contentful-paint']?.numericValue || 0);
  return {
    score: Math.round((lh.categories.performance?.score ?? 0) * 100),
    lcp: audits['largest-contentful-paint']?.displayValue || null,
    lcpMs,
    cls: audits['cumulative-layout-shift']?.displayValue || null,
    fcp: audits['first-contentful-paint']?.displayValue || null,
    ttfb: audits['server-response-time']?.displayValue || null,
    tbt: audits['total-blocking-time']?.displayValue || null,
    inp: audits['interaction-to-next-paint']?.displayValue || null,
  };
}

function calculateHealthScore(r) {
  let score = 100;
  const issues = [];

  function deduct(pts, severity, type, message) {
    score -= pts;
    issues.push({ pts, severity, type, message });
  }

  // Security / indexability (critical)
  if (!r.isHttps) deduct(10, 'Critical', 'SECURITY', 'Site is not served over HTTPS');
  if (r.seo.isNoIndex) deduct(30, 'Critical', 'INDEXABILITY', 'noindex directive found — page is blocked from Google');

  // Core on-page SEO
  if (!r.seo.title) deduct(10, 'High', 'TITLE', 'No <title> tag found');
  else if (r.seo.titleWarning) deduct(5, 'Medium', 'TITLE', `Title ${r.seo.titleWarning}`);

  if (r.seo.metaDesc === null) deduct(10, 'High', 'META DESC', 'No meta description found');
  else if (r.seo.metaDescWarning) deduct(5, 'Medium', 'META DESC', `Meta description ${r.seo.metaDescWarning}`);

  if (r.headings.h1Count === 0) deduct(10, 'High', 'HEADINGS', 'No H1 tag found');
  else if (r.headings.h1Count > 1) deduct(5, 'Medium', 'HEADINGS', `${r.headings.h1Count} H1 tags found — should be exactly 1`);

  for (const hi of r.headings.issues.filter(i => i.includes('skipped'))) {
    deduct(3, 'Low', 'HEADING STRUCTURE', hi);
  }

  // Content
  if (r.content.wordCount < 300) deduct(5, 'Medium', 'CONTENT', `Thin content: only ${r.content.wordCount} words`);

  // Mobile
  if (!r.hasViewport) deduct(5, 'High', 'MOBILE', 'No viewport meta tag — site may render poorly on mobile');

  // Images
  if (r.images.missingAlt > 0) {
    deduct(Math.min(10, r.images.missingAlt * 2), 'Medium', 'IMAGES',
      `${r.images.missingAlt} of ${r.images.total} images missing alt text`);
  }

  // Schema & social
  if (!r.schema.found) deduct(5, 'Medium', 'SCHEMA', 'No structured data (JSON-LD) found — missed opportunity for rich results');
  if (!r.seo.og.image) deduct(3, 'Low', 'SOCIAL META', 'No og:image — social shares will show no preview image');
  if (!r.seo.og.title && !r.seo.og.description) {
    deduct(2, 'Low', 'SOCIAL META', 'No Open Graph tags (og:title / og:description)');
  }

  // Canonicalization
  if (r.seo.canonicalMismatch) deduct(5, 'Medium', 'CANONICALIZATION', 'Canonical URL does not match the page URL');

  // Infrastructure
  if (!r.infrastructure.robotsTxt.found) deduct(2, 'Low', 'INFRASTRUCTURE', 'No robots.txt file found');
  if (!r.infrastructure.sitemap.found) deduct(3, 'Low', 'INFRASTRUCTURE', 'No XML sitemap found at common paths');

  // Performance (if available)
  if (r.performance && !r.performance.error) {
    if (r.performance.score < 50) deduct(10, 'High', 'PERFORMANCE', `Mobile PageSpeed score is ${r.performance.score}/100`);
    else if (r.performance.score < 75) deduct(5, 'Medium', 'PERFORMANCE', `Mobile PageSpeed score is ${r.performance.score}/100`);
    if (r.performance.lcpMs > 4000) {
      deduct(5, 'High', 'CORE WEB VITALS', `LCP is ${r.performance.lcp} — poor (aim for < 2.5s)`);
    }
  }

  score = Math.max(0, score);
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
  const label = score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Needs Work' : score >= 60 ? 'Poor' : 'Critical Issues';

  return {
    healthScore: { score, grade, label },
    issues: issues.sort((a, b) => {
      const order = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
    }),
  };
}

// ─── Main audit ───────────────────────────────────────────────────────────────

async function runAudit(url, parsed, psiKey) {
  const t0 = Date.now();

  // ── 1. Fetch target page ──────────────────────────────────────────────────
  let response, html;
  try {
    response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; LagomiumAudit/1.0; +https://lagomium.com/audit)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });
    html = await response.text();
  } catch (e) {
    return { url, auditedAt: new Date().toISOString(), scrapeStatus: `Failed: ${e.message}` };
  }

  if (response.status >= 400) {
    return {
      url, auditedAt: new Date().toISOString(),
      scrapeStatus: `Failed: HTTP ${response.status}`,
      httpStatus: response.status,
    };
  }

  const xRobotsTag = response.headers.get('x-robots-tag') || '';
  const finalUrl = response.url || url;
  const wasRedirected = normalizeUrl(finalUrl) !== normalizeUrl(url);

  // ── 2. HTMLRewriter: attribute extraction ─────────────────────────────────
  //    Used for meta tags, OG, images, links, script srcs — all attribute-based.
  const ex = {
    metaDesc: null, metaRobots: '', metaKeywords: null, canonical: null,
    viewport: null, metaGenerator: null,
    ogTitle: null, ogDesc: null, ogImage: null, ogType: null,
    twitterCard: null, twitterTitle: null,
    images: [], linkHrefs: [], scriptSrcs: [], hreflang: [],
  };

  await new HTMLRewriter()
    .on('meta[name="description"]',    { element(el) { ex.metaDesc       = el.getAttribute('content'); } })
    .on('meta[name="robots"]',         { element(el) { ex.metaRobots     = el.getAttribute('content') || ''; } })
    .on('meta[name="keywords"]',       { element(el) { ex.metaKeywords   = el.getAttribute('content'); } })
    .on('meta[name="generator"]',      { element(el) { ex.metaGenerator  = el.getAttribute('content'); } })
    .on('meta[name="viewport"]',       { element(el) { ex.viewport       = el.getAttribute('content'); } })
    .on('link[rel="canonical"]',       { element(el) { ex.canonical      = el.getAttribute('href') || null; } })
    .on('link[rel="alternate"][hreflang]', { element(el) { ex.hreflang.push(el.getAttribute('hreflang')); } })
    .on('meta[property="og:title"]',       { element(el) { ex.ogTitle  = el.getAttribute('content'); } })
    .on('meta[property="og:description"]', { element(el) { ex.ogDesc   = el.getAttribute('content'); } })
    .on('meta[property="og:image"]',       { element(el) { ex.ogImage  = el.getAttribute('content'); } })
    .on('meta[property="og:type"]',        { element(el) { ex.ogType   = el.getAttribute('content'); } })
    .on('meta[name="twitter:card"]',       { element(el) { ex.twitterCard  = el.getAttribute('content'); } })
    .on('meta[name="twitter:title"]',      { element(el) { ex.twitterTitle = el.getAttribute('content'); } })
    .on('img', {
      element(el) {
        ex.images.push({
          alt:     el.getAttribute('alt'),       // null = no attr at all
          src:     el.getAttribute('src') || '',
          loading: el.getAttribute('loading') || '',
          w:       el.getAttribute('width'),
          h:       el.getAttribute('height'),
        });
      },
    })
    .on('a[href]', { element(el) { ex.linkHrefs.push(el.getAttribute('href') || ''); } })
    .on('script[src]', { element(el) { ex.scriptSrcs.push(el.getAttribute('src') || ''); } })
    .transform(new Response(html, { headers: { 'Content-Type': 'text/html' } }))
    .text();

  // ── 3. Regex: text content extraction ─────────────────────────────────────
  //    HTMLRewriter text handlers are streaming; regex on the full string is
  //    simpler and reliable for titles, headings, and JSON-LD blocks.

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
    .replace(/<[^>]+>/g, '').trim();

  const h1Texts = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  const h2 = (html.match(/<h2[^>]*>/gi) || []).length;
  const h3 = (html.match(/<h3[^>]*>/gi) || []).length;
  const h4 = (html.match(/<h4[^>]*>/gi) || []).length;
  const h5 = (html.match(/<h5[^>]*>/gi) || []).length;
  const h6 = (html.match(/<h6[^>]*>/gi) || []).length;

  // JSON-LD schema extraction
  const schemaTypes = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const obj = JSON.parse(m[1]);
      const items = Array.isArray(obj) ? obj : [obj];
      for (const item of items) {
        const directTypes = [item['@type']].flat().filter(Boolean);
        schemaTypes.push(...directTypes);
        // Handle @graph pattern
        for (const node of (item['@graph'] || [])) {
          schemaTypes.push(...[node['@type']].flat().filter(Boolean));
        }
      }
    } catch (e) { /* malformed JSON-LD — skip */ }
  }

  // Body text: strip nav/footer/scripts/styles for cleaner word count + readability
  const bodyText = html
    .replace(/<(script|style|nav|header|footer|aside|noscript|iframe)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // ── 4. Process extracted data ─────────────────────────────────────────────

  const hostname = parsed.hostname.replace(/^www\./i, '');
  let internal = 0, external = 0, malformed = 0;
  for (const href of ex.linkHrefs) {
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const r = new URL(href, url);
      r.hostname.replace(/^www\./i, '') === hostname ? internal++ : external++;
    } catch (e) { malformed++; }
  }

  const imgStats = ex.images.reduce(
    (s, img) => {
      if (img.alt === null) s.missingAlt++;         // null = no alt attr (bad)
      if (img.loading === 'lazy') s.lazyLoaded++;
      if (/\.(png|jpe?g|gif)(\?|$)/i.test(img.src)) s.legacyFormats++;
      return s;
    },
    { total: ex.images.length, missingAlt: 0, lazyLoaded: 0, legacyFormats: 0 }
  );

  // Third-party script detection (was dead code in original — fixed here)
  const thirdParty = [];
  const seen = new Set();
  for (const src of ex.scriptSrcs) {
    const lower = src.toLowerCase();
    for (const [sig, name] of Object.entries(THIRD_PARTY)) {
      if (lower.includes(sig) && !seen.has(name)) { seen.add(name); thirdParty.push(name); }
    }
  }

  const isNoIndex =
    ex.metaRobots.toLowerCase().includes('noindex') ||
    xRobotsTag.toLowerCase().includes('noindex');

  const canonicalMismatch =
    ex.canonical ? normalizeUrl(ex.canonical) !== normalizeUrl(url) : false;

  const titleLen = title.length;
  const titleWarning =
    !title          ? 'Missing' :
    titleLen < 30   ? `Too short (${titleLen} chars — aim for 50–60)` :
    titleLen > 60   ? `Too long (${titleLen} chars — aim for 50–60)` : null;

  const descLen = (ex.metaDesc || '').length;
  const metaDescWarning =
    ex.metaDesc === null ? 'Missing' :
    descLen < 70         ? `Too short (${descLen} chars — aim for 120–155)` :
    descLen > 160        ? `Too long (${descLen} chars — aim for 120–155)` : null;

  const headingIssues = [];
  if (!h1Texts.length) headingIssues.push('No H1 tag');
  if (h1Texts.length > 1) headingIssues.push(`${h1Texts.length} H1 tags (should be exactly 1)`);
  if (!h2 && h3) headingIssues.push('H3 used without H2 — skipped heading level');
  if (!h2 && h4) headingIssues.push('H4 used without H2 — skipped heading level');

  // Local signals (was declared but never populated in original)
  const hasPhone = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/.test(bodyText);
  const hasAddress =
    /\d{1,5}\s+[\w\s]{2,30}(street|st\b|avenue|ave\b|road|rd\b|boulevard|blvd|drive|dr\b|lane|ln\b|way|place|pl\b|court|ct\b)/i
    .test(bodyText);

  const words = bodyText.split(/\s+/).filter(Boolean);

  // ── 5. Parallel infrastructure checks ─────────────────────────────────────
  const [robotsRes, sitemapRes] = await Promise.allSettled([
    checkRobotsTxt(parsed),
    checkSitemap(parsed),
  ]);

  // ── 6. Optional PageSpeed (25s hard timeout) ───────────────────────────────
  let performance = null;
  if (psiKey) {
    try {
      performance = await Promise.race([
        fetchPageSpeed(url, psiKey),
        new Promise((_, rej) => setTimeout(() => rej(new Error('Timed out after 25s')), 25000)),
      ]);
    } catch (e) {
      performance = { error: e.message };
    }
  }

  // ── 7. Assemble report ────────────────────────────────────────────────────
  const report = {
    url,
    finalUrl,
    auditedAt: new Date().toISOString(),
    scrapeStatus: 'Success',
    httpStatus: response.status,
    wasRedirected,
    isHttps: parsed.protocol === 'https:',
    pageSizeBytes: new TextEncoder().encode(html).length,
    cms: detectCms(html, ex.metaGenerator),
    hasViewport: !!ex.viewport,

    seo: {
      title, titleLength: titleLen, titleWarning,
      metaDesc: ex.metaDesc, metaDescLength: descLen, metaDescWarning,
      metaKeywords: ex.metaKeywords,
      metaRobots: ex.metaRobots,
      isNoIndex,
      canonical: ex.canonical,
      canonicalMismatch,
      og: {
        title: ex.ogTitle,
        description: ex.ogDesc,
        image: ex.ogImage,
        type: ex.ogType,
      },
      twitter: {
        card: ex.twitterCard,
        title: ex.twitterTitle,
      },
      hreflang: ex.hreflang,
    },

    headings: {
      h1: h1Texts,
      h1Count: h1Texts.length,
      h2, h3, h4, h5, h6,
      issues: headingIssues,
    },

    content: {
      wordCount: words.length,
      status:
        words.length < 300 ? 'Thin (<300 words)' :
        words.length < 700 ? 'Moderate (300–700)' : 'Good depth (700+)',
      readability: analyzeReadability(bodyText),
      topKeywords: topKeywords(bodyText, 12),
    },

    images: imgStats,
    links: { internal, external, malformed },

    schema: {
      found: schemaTypes.length > 0,
      types: [...new Set(schemaTypes)],
    },

    thirdPartyScripts: thirdParty,

    localSignals: { hasPhone, hasAddress },

    infrastructure: {
      robotsTxt: robotsRes.status === 'fulfilled' ? robotsRes.value : { found: false },
      sitemap:   sitemapRes.status === 'fulfilled' ? sitemapRes.value : { found: false },
    },

    performance,

    durationMs: Date.now() - t0,
  };

  // ── 8. Health score ───────────────────────────────────────────────────────
  const scoring = calculateHealthScore(report);
  report.healthScore = scoring.healthScore;
  report.issues = scoring.issues;

  return report;
}
