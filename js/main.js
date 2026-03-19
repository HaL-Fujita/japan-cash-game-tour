// ============================================
//  キャッシュゲームコンシェルジュ — main.js
// ============================================

// --- Header transparent/opaque ---
const header = document.querySelector('header');
function updateHeader() {
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.remove('transparent');
    header.classList.add('opaque');
  } else {
    header.classList.add('transparent');
    header.classList.remove('opaque');
  }
}
if (header) {
  if (document.querySelector('.hero')) {
    header.classList.add('transparent');
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  } else {
    header.classList.add('opaque');
  }
}

// --- Hamburger ---
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { header?.classList.add('opaque'); header?.classList.remove('transparent'); }
    else { updateHeader(); }
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      updateHeader();
    });
  });
}

// --- Scroll Reveal ---
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// --- FAQ ---
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- TOC ---
const tocHeader = document.querySelector('.toc-header');
const tocList   = document.querySelector('.toc-list');
const tocArrow  = document.querySelector('.toc-arrow');
if (tocHeader && tocList) {
  tocList.classList.add('open');
  if (tocArrow) tocArrow.classList.add('open');
  tocHeader.addEventListener('click', () => {
    const open = tocList.classList.toggle('open');
    if (tocArrow) tocArrow.classList.toggle('open', open);
  });
}

// -----------------------------------------------------------
//  リアルなポーカールーム写真マッピング（Unsplash厳選）
//  poker table / casino chips / real casino room など
// -----------------------------------------------------------
const sceneMap = {
  // Hero: 高級カジノの雰囲気ある広角ショット
  'hero':          'https://images.unsplash.com/photo-1593510987185-1ec2256148a3?w=1800&q=85&fit=crop',
  // Macau: マカオ風の豪華インテリア
  'macau':         'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1000&q=80&fit=crop',
  // Manila
  'manila':        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&q=80&fit=crop',
  // Singapore: MBS夜景
  'singapore':     'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000&q=80&fit=crop',
  // Las Vegas: ストリップの夜
  'lasvegas':      'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=1000&q=80&fit=crop',
  // London
  'london':        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&q=80&fit=crop',
  // ポーカーテーブル接写
  'poker-table':   'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1000&q=80&fit=crop',
  // 空港
  'airport':       'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1000&q=80&fit=crop',
  // カジノフロア（広め）
  'casino-floor':  'https://images.unsplash.com/photo-1559729238-c0b87d0ac60a?w=1000&q=80&fit=crop',
  // ホテルロビー
  'hotel':         'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1000&q=80&fit=crop',
  // チップ
  'chips':         'https://images.unsplash.com/photo-1541278107931-e006523892df?w=1000&q=80&fit=crop',
  // Intro: ポーカー手札
  'intro':         'https://images.unsplash.com/photo-1503198515498-d0bd9ed16902?w=1000&q=80&fit=crop',
  // CTA背景
  'cta':           'https://images.unsplash.com/photo-1593510987185-1ec2256148a3?w=1800&q=80&fit=crop',
  // マカオルーム（グランドリスボン風）
  'macau-room':    'https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=1000&q=80&fit=crop',
  // 記事サムネイル
  'article-macau': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fit=crop',
  'article-manila':'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80&fit=crop',
  'article-init':  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fit=crop',
  'article-lv':    'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80&fit=crop',
  'article-money': 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80&fit=crop',
  'article-sg':    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80&fit=crop',
};

document.querySelectorAll('img[data-scene]').forEach(img => {
  const url = sceneMap[img.dataset.scene];
  if (url) { img.src = url; img.loading = 'lazy'; }
});

// -----------------------------------------------------------
//  Lottie アニメーション読み込み
//  LottieFiles CDN（@lottiefiles/lottie-player）
// -----------------------------------------------------------
(function loadLottie() {
  // すでに読み込み済みならスキップ
  if (customElements.get('lottie-player')) return;
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/@lottiefiles/lottie-player@2/dist/lottie-player.js';
  s.async = true;
  s.onload = initLottie;
  document.head.appendChild(s);
})();

// Lottie URLs（LottieFiles Free CC0）
const lottieUrls = {
  scroll:   'https://assets2.lottiefiles.com/packages/lf20_lf20_lf20.json', // fallback
  cards:    'https://assets9.lottiefiles.com/packages/lf20_yd8fbnml.json',
  globe:    'https://assets3.lottiefiles.com/packages/lf20_ibnrjxsm.json',
  plane:    'https://assets6.lottiefiles.com/packages/lf20_x1gjdldd.json',
  money:    'https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json',
  trophy:   'https://assets1.lottiefiles.com/packages/lf20_touohxv0.json',
  checklist:'https://assets10.lottiefiles.com/packages/lf20_tbwqheld.json',
  handshake:'https://assets4.lottiefiles.com/packages/lf20_t9gkkhz4.json',
  map:      'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json',
  star:     'https://assets7.lottiefiles.com/packages/lf20_s4tubmwg.json',
};

// lottie-player をdata-lottie属性から自動挿入
function initLottie() {
  document.querySelectorAll('[data-lottie]').forEach(el => {
    const key = el.dataset.lottie;
    const url = lottieUrls[key] || lottieUrls.cards;
    // lottie-player要素を作成
    const player = document.createElement('lottie-player');
    player.setAttribute('src', url);
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', '0.9');
    player.setAttribute('loop', '');
    player.setAttribute('autoplay', '');
    player.className = el.className.replace('lottie-placeholder','').trim();
    // サイズ引き継ぎ
    const w = el.dataset.width || '80';
    const h = el.dataset.height || '80';
    player.style.width  = w + 'px';
    player.style.height = h + 'px';
    el.replaceWith(player);
  });
}
// scriptが先に読み込まれた場合
if (customElements.get('lottie-player')) initLottie();
