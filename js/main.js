(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();
