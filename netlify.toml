/**
 * build-blog.js
 * ------------------------------------------------------------
 * Runs automatically on every Netlify deploy (see netlify.toml build command).
 *
 * What it does:
 *   1. Reads every post file in /blog/content/*.json (these are the files
 *      Decap CMS commits to GitHub when you click "Publish" in /admin).
 *   2. Builds /blog/posts.json — the manifest the blog listing page reads.
 *   3. Generates a real, standalone /blog/<slug>.html file for each post —
 *      these are the actual pages Google crawls and indexes.
 *
 * Net effect: write a post in /admin -> click Publish -> Netlify rebuilds
 * automatically -> the post is live and indexable with ZERO manual file
 * uploads. This is the same template/markup used by the in-browser admin
 * tool (blog/index.html), just generated server-side at build time instead
 * of being downloaded by hand.
 * ------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, 'blog', 'content');
const BLOG_DIR = path.join(__dirname, 'blog');
const SITE_URL = 'https://www.fincalmax.com';

const CATEGORY_META = {
  Mortgage:        { bg: '#e8f0fb', clr: '#0d3b6e' },
  Refinance:       { bg: '#fef3c7', clr: '#92400e' },
  Loans:           { bg: '#f0fdf4', clr: '#166534' },
  Retirement:      { bg: '#fae8ff', clr: '#86198f' },
  Budgeting:       { bg: '#ecfeff', clr: '#0e7490' },
  'Real Estate':   { bg: '#fff1f2', clr: '#9f1239' },
  Tax:             { bg: '#eef2ff', clr: '#3730a3' },
  Strategy:        { bg: '#ecfdf5', clr: '#059669' },
};
function catMeta(cat) {
  return CATEGORY_META[cat] || { bg: '#f1f5f9', clr: '#334155' };
}

function escAttr(s) {
  return (s || '').replace(/"/g, '&quot;');
}

function isoDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d) ? '' : d.toISOString().slice(0, 10);
}

// Insert the 2nd ad roughly halfway through the article body, snapped to a
// heading boundary so it never lands mid-sentence. Mirrors the in-browser
// generator in blog/index.html so output is identical either way.
function insertMidAd(content) {
  const adHtml = '<div class="ad-center"><div class="ad-block ad-728">Advertisement 2 of 3 · 728×90 (Middle)</div></div>';
  const blocks = (content || '').split(/(<\/h2>|<\/h3>)/i);
  if (blocks.length > 4) {
    const mid = Math.floor(blocks.length / 2);
    const insertAt = mid % 2 === 0 ? mid : mid + 1;
    blocks.splice(insertAt, 0, adHtml);
    return blocks.join('');
  }
  return (content || '') + adHtml;
}

function generateStaticPostHTML(p) {
  const url = `${SITE_URL}/blog/${p.slug}.html`;
  const metaTitle = p.metaTitle || p.title;
  const metaDesc = p.metaDesc || p.desc;
  const dateISO = isoDate(p.date);
  const cm = catMeta(p.category);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${metaTitle} | FincalMax</title>
<meta name="description" content="${escAttr(metaDesc)}">
${p.keywords ? `<meta name="keywords" content="${escAttr(p.keywords)}">\n` : ''}<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escAttr(metaTitle)} | FincalMax">
<meta property="og:description" content="${escAttr(metaDesc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(metaTitle)} | FincalMax">
<meta name="twitter:description" content="${escAttr(metaDesc)}">
<meta name="twitter:image" content="${SITE_URL}/og-image.png">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BlogPosting","headline":${JSON.stringify(p.title)},"description":${JSON.stringify(p.desc)},"datePublished":${JSON.stringify(dateISO)},"author":{"@type":"Organization","name":${JSON.stringify(p.author || 'FincalMax Editorial Team')}},"publisher":{"@type":"Organization","name":"FincalMax"}}</script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css">
</head>
<body>
<header>
  <a href="../index.html" class="logo"><span class="logo-mark"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#22c55e" stroke-width="2" fill="#0d3b6e"/><text x="16" y="14.5" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-weight="900" font-size="8.5">FM</text><rect x="9" y="17.5" width="3.5" height="6" rx="0.5" fill="#22c55e"/><rect x="14.2" y="14.5" width="3.5" height="9" rx="0.5" fill="#22c55e"/><path d="M18.5 19 Q22.5 13 25 11" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" fill="none"/><polygon points="25,9 27.5,12.5 23.5,12.5" fill="#22c55e"/></svg></span><span class="logo-text">Fincal<span>Max</span></span></a>
  <nav class="nav-links"><a href="../calculators/index.html">Calculators</a><a href="../articles/index.html">Articles</a><a href="index.html" class="active">Blog</a><a href="../pages/about.html">About</a><a href="../pages/contact.html">Contact</a></nav>
  <div class="header-right"><button class="hamburger" aria-label="Open menu" aria-expanded="false" onclick="document.getElementById('mm').classList.toggle('open')"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button></div>
</header>
<div class="mobile-menu" id="mm"><a href="../index.html">🏠 Home</a><a href="../calculators/index.html">🧮 Calculators</a><a href="../articles/index.html">📚 Articles</a><a href="index.html">📰 Blog</a></div>
<div class="ad-strip"><div class="ad-block ad-728">Advertisement 1 of 3 · 728×90 (Top)</div></div>
<div class="breadcrumb"><a href="../index.html">Home</a><span>›</span><a href="index.html">Blog</a><span>›</span><span>${escAttr(p.title)}</span></div>
<div class="main">
  <div class="article-header">
    <span class="article-tag" style="background:${cm.bg};color:${cm.clr}">${p.category}</span>
    <h1 class="article-title">${p.title}</h1>
    <p class="article-intro">${p.desc}</p>
  </div>
  <div class="article-body">${insertMidAd(p.content)}</div>
  <div class="ad-center"><div class="ad-block ad-728">Advertisement 3 of 3 · 728×90 (Bottom)</div></div>
  <div class="related-links"><h4>🔗 Related Calculators</h4>
    <a href="../calculators/mortgage-calculator.html">🏠 Mortgage Calculator</a>
    <a href="../calculators/index.html">🧮 All Calculators</a>
    <a href="index.html">📰 Back to Blog</a>
  </div>
</div>
<footer>
  <div class="footer-main">
    <div><span class="footer-brand"><svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="16" cy="16" r="15" stroke="#22c55e" stroke-width="2" fill="#0d3b6e"/><text x="16" y="14.5" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-weight="900" font-size="8.5">FM</text><rect x="9" y="17.5" width="3.5" height="6" rx="0.5" fill="#22c55e"/><rect x="14.2" y="14.5" width="3.5" height="9" rx="0.5" fill="#22c55e"/><path d="M18.5 19 Q22.5 13 25 11" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" fill="none"/><polygon points="25,9 27.5,12.5 23.5,12.5" fill="#22c55e"/></svg>FincalMax</span><div class="footer-desc">Free calculators for real estate and finance.</div></div>
    <div class="footer-col"><div class="footer-col-title">Calculators</div><a href="../calculators/mortgage-calculator.html">Mortgage</a><a href="../calculators/index.html">All Calculators</a></div>
    <div class="footer-col"><div class="footer-col-title">Blog</div><a href="index.html">All Posts</a><a href="../articles/index.html">Articles</a></div>
    <div class="footer-col"><div class="footer-col-title">Company</div><a href="../pages/about.html">About</a><a href="../pages/privacy-policy.html">Privacy</a></div>
  </div>
  <div class="footer-bottom"><span>© 2026 FincalMax.com · Not financial advice</span><div class="footer-links"><a href="../pages/privacy-policy.html">Privacy</a><a href="../pages/terms.html">Terms</a></div></div>
</footer>
<script>document.addEventListener('click',e=>{const m=document.getElementById('mm');if(m&&!m.contains(e.target)&&!e.target.closest('.hamburger'))m.classList.remove('open');});</script>
</body>
</html>`;
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[build-blog] No blog/content directory found — nothing to build. Creating empty posts.json.');
    fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), '[]\n');
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  const posts = [];

  files.forEach(file => {
    try {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const post = JSON.parse(raw);
      if (!post.slug) {
        console.warn(`[build-blog] Skipping ${file}: missing "slug"`);
        return;
      }
      posts.push(post);
    } catch (e) {
      console.warn(`[build-blog] Skipping ${file}: ${e.message}`);
    }
  });

  // Newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 1) Write the manifest the blog listing page fetches
  fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log(`[build-blog] Wrote blog/posts.json with ${posts.length} post(s).`);

  // 2) Write one real, standalone HTML page per post
  posts.forEach(p => {
    const html = generateStaticPostHTML(p);
    fs.writeFileSync(path.join(BLOG_DIR, `${p.slug}.html`), html);
    console.log(`[build-blog] Wrote blog/${p.slug}.html`);
  });

  // 3) Append any new post URLs to sitemap.xml that aren't already there
  try {
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    let added = 0;
    posts.forEach(p => {
      const loc = `${SITE_URL}/blog/${p.slug}.html`;
      if (!sitemap.includes(loc)) {
        const entry = `  <url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
        sitemap = sitemap.replace('</urlset>', entry + '</urlset>');
        added++;
      }
    });
    if (added) {
      fs.writeFileSync(sitemapPath, sitemap);
      console.log(`[build-blog] Added ${added} new post URL(s) to sitemap.xml.`);
    }
  } catch (e) {
    console.warn('[build-blog] Could not update sitemap.xml:', e.message);
  }
}

main();
