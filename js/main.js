// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Header scroll shadow
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// TOC accordion
const tocHeader = document.querySelector('.toc-header');
const tocList = document.querySelector('.toc-list');
const tocArrow = document.querySelector('.toc-arrow');
if (tocHeader && tocList) {
  tocHeader.addEventListener('click', () => {
    tocList.classList.toggle('open');
    if (tocArrow) tocArrow.classList.toggle('open');
  });
  tocList.classList.add('open');
  if (tocArrow) tocArrow.classList.add('open');
}
