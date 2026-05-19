(() => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden', !mobileNav.classList.contains('hidden'));
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }
})();
