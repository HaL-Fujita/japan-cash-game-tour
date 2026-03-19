// ============================================
//  キャッシュゲームコンシェルジュ — main.js
// ============================================

// --- Header transparent/opaque ---
const header = document.querySelector('header');
function updateHeader() {
  if (!header) return;
  const heroHeight = window.innerHeight * 0.1;
  if (window.scrollY > heroHeight) {
    header.classList.remove('transparent');
    header.classList.add('opaque');
  } else {
    header.classList.add('transparent');
    header.classList.remove('opaque');
  }
}
if (header) {
  const hasHero = document.querySelector('.hero');
  if (hasHero) {
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
    // When menu opens on hero, make header opaque
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
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// --- FAQ accordion ---
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- TOC accordion (article) ---
const tocHeader = document.querySelector('.toc-header');
const tocList = document.querySelector('.toc-list');
const tocArrow = document.querySelector('.toc-arrow');
if (tocHeader && tocList) {
  tocList.classList.add('open');
  if (tocArrow) tocArrow.classList.add('open');
  tocHeader.addEventListener('click', () => {
    const open = tocList.classList.toggle('open');
    if (tocArrow) tocArrow.classList.toggle('open', open);
  });
}

// --- Lazy load placeholder images with Unsplash ---
// Maps img elements with data-scene attribute to curated Unsplash URLs
const sceneMap = {
  'hero':          'https://images.unsplash.com/photo-1596838132731-d6f0b4017e10?w=1600&q=80&fit=crop',
  'macau':         'https://images.unsplash.com/photo-1613728895449-1bde64bf9e5e?w=900&q=80&fit=crop',
  'manila':        'https://images.unsplash.com/photo-1583420062861-2a18f22df0c3?w=900&q=80&fit=crop',
  'singapore':     'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80&fit=crop',
  'lasvegas':      'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=900&q=80&fit=crop',
  'london':        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80&fit=crop',
  'poker-table':   'https://images.unsplash.com/photo-1646818357700-f8e3bd3df95e?w=900&q=80&fit=crop',
  'airport':       'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&fit=crop',
  'casino-floor':  'https://images.unsplash.com/photo-1596838132731-d6f0b4017e10?w=900&q=80&fit=crop',
  'hotel':         'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80&fit=crop',
  'chips':         'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80&fit=crop',
  'intro':         'https://images.unsplash.com/photo-1566895733044-d2bdda8b6234?w=900&q=80&fit=crop',
  'cta':           'https://images.unsplash.com/photo-1573164713619-24a3b5a0e4d4?w=1600&q=80&fit=crop',
  'macau-room':    'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=900&q=80&fit=crop',
  'article-macau': 'https://images.unsplash.com/photo-1613728895449-1bde64bf9e5e?w=900&q=80&fit=crop',
  'article-manila':'https://images.unsplash.com/photo-1618454795752-7f82e08b4a6f?w=900&q=80&fit=crop',
  'article-init':  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&fit=crop',
  'article-lv':    'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=900&q=80&fit=crop',
  'article-money': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80&fit=crop',
  'article-sg':    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80&fit=crop',
};

document.querySelectorAll('img[data-scene]').forEach(img => {
  const scene = img.dataset.scene;
  if (sceneMap[scene]) {
    img.src = sceneMap[scene];
    img.loading = 'lazy';
  }
});
