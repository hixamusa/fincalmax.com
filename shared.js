// ═══════════════════════════════════
// FINCALMAX — Shared Components
// ═══════════════════════════════════

const SITE_NAME = "FincalMax";
const SITE_URL = "https://www.fincalmax.com";

// ── HEADER HTML ──
function renderHeader(activePage = '') {
  return `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<header>
  <a href="/" class="logo">
    <span class="logo-mark">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="13" stroke="#22c55e" stroke-width="2" fill="#0f2a4a"/>
        <text x="14" y="13" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-weight="900" font-size="7.5">FM</text>
        <rect x="8" y="15.5" width="3" height="5" rx="0.5" fill="#22c55e"/>
        <rect x="12.5" y="13" width="3" height="7.5" rx="0.5" fill="#22c55e"/>
        <path d="M16 17 Q20 12 22 10" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <polygon points="22,8 24,11 21,11" fill="#22c55e"/>
      </svg>
    </span>
    <span class="logo-text">Fincal<span>Max</span></span>
  </a>
  <nav class="nav-links">
    <a href="/calculators/" class="${activePage==='calculators'?'active':''}">Calculators</a>
    <a href="/articles/" class="${activePage==='articles'?'active':''}">Articles</a>
    <a href="/pages/about.html" class="${activePage==='about'?'active':''}">About</a>
    <a href="/pages/contact.html" class="${activePage==='contact'?'active':''}">Contact</a>
  </nav>
  <div class="header-right">
    <button class="hamburger" onclick="document.getElementById('mobileMenu').classList.toggle('open')">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu">
  <a href="/">🏠 Home</a>
  <a href="/calculators/">🧮 All Calculators</a>
  <a href="/calculators/mortgage-calculator.html">🏠 Mortgage</a>
  <a href="/calculators/refinance-calculator.html">🔄 Refinance</a>
  <a href="/articles/">📚 Articles</a>
  <a href="/pages/about.html">👤 About</a>
  <a href="/pages/contact.html">📬 Contact</a>
</div>
<div class="ad-strip">
  <!-- Google AdSense: leaderboard 728x90 -->
  <div class="ad-block ad-728">Advertisement · 728×90</div>
</div>`;
}

// ── FOOTER HTML ──
function renderFooter() {
  return `
<footer>
  <div class="footer-main">
    <div>
      <span class="footer-brand">
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" style="display:inline-block;vertical-align:middle;margin-right:6px"><circle cx="14" cy="14" r="13" stroke="#22c55e" stroke-width="2" fill="#0f2a4a"/><text x="14" y="13" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-weight="900" font-size="7.5">FM</text><rect x="8" y="15.5" width="3" height="5" rx="0.5" fill="#22c55e"/><rect x="12.5" y="13" width="3" height="7.5" rx="0.5" fill="#22c55e"/><path d="M16 17 Q20 12 22 10" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" fill="none"/><polygon points="22,8 24,11 21,11" fill="#22c55e"/></svg>
        FincalMax
      </span>
      <div class="footer-desc">Free, accurate financial calculators for mortgage, refinance, and real estate decisions.</div>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Calculators</div>
      <a href="/calculators/mortgage-calculator.html">Mortgage</a>
      <a href="/calculators/refinance-calculator.html">Refinance</a>
      <a href="/calculators/affordability-calculator.html">Affordability</a>
      <a href="/calculators/pmi-calculator.html">PMI</a>
      <a href="/calculators/rent-vs-buy-calculator.html">Rent vs Buy</a>
      <a href="/calculators/">All Calculators →</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Articles</div>
      <a href="/articles/">All Articles</a>
      <a href="/articles/best-mortgage-rate-2026.html">Best Mortgage Rate</a>
      <a href="/articles/should-i-refinance-2026.html">Should I Refinance?</a>
      <a href="/articles/first-time-homebuyer-guide.html">First-Time Buyer Guide</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Company</div>
      <a href="/pages/about.html">About Us</a>
      <a href="/pages/contact.html">Contact</a>
      <a href="/pages/privacy-policy.html">Privacy Policy</a>
      <a href="/pages/terms.html">Terms of Service</a>
      <a href="/pages/disclaimer.html">Disclaimer</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 FincalMax.com · For informational purposes only · Not financial advice</span>
    <div class="footer-links">
      <a href="/pages/privacy-policy.html">Privacy</a>
      <a href="/pages/terms.html">Terms</a>
      <a href="/pages/disclaimer.html">Disclaimer</a>
      <a href="/pages/contact.html">Contact</a>
    </div>
  </div>
</footer>`;
}

// ── FAQ TOGGLE ──
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('open');
    });
  });
}

// ── FORMAT NUMBER ──
const fmt = n => '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
const fmtN = n => Math.round(Math.abs(n)).toLocaleString('en-US');
const fmtPct = n => (Math.round(n * 10) / 10) + '%';

// ── MORTGAGE PI ──
function calcPI(loan, rate, years) {
  const r = rate / 100 / 12, n = years * 12;
  if (r === 0) return loan / n;
  return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  // Close mobile menu on outside click
  document.addEventListener('click', e => {
    const menu = document.getElementById('mobileMenu');
    if (menu && !menu.contains(e.target) && !e.target.closest('.hamburger')) {
      menu.classList.remove('open');
    }
  });
});
