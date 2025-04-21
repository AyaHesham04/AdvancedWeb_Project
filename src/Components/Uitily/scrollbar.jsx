let scrollTimeout;

export function initScrollbar() {
  document.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 200);
  });
}