(function () {
  var pw = document.querySelector('.progress-wrap');
  if (!pw) return;
  var ticking = false;
  function update() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    pw.classList.toggle('scrolled', y > 4);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();
