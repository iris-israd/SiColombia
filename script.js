// Menú móvil
const btn = document.getElementById('menu-btn');
const links = document.querySelector('.links');
if (btn) btn.addEventListener('click', () => {
  const abierto = links.classList.toggle('abierto');
  btn.setAttribute('aria-expanded', abierto);
});

// Carrusel
const hero = document.getElementById('hero');
if (hero) {
  const pista = hero.querySelector('.carrusel-pista');
  const slides = hero.querySelectorAll('.slide');
  const puntos = hero.querySelector('.puntos');
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir a la diapositiva ' + (n + 1));
    b.addEventListener('click', () => { ir(n); reiniciar(); });
    puntos.appendChild(b);
  });
  function ir(n) {
    i = (n + slides.length) % slides.length;
    pista.style.transform = `translateX(-${i * 100}%)`;
    puntos.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', k === i));
    hero.dataset.tema = slides[i].classList.contains('s2') || slides[i].classList.contains('s3') ? 'oscuro' : 'claro';
  }
  function reiniciar() {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => ir(i + 1), 6500);
  }
  hero.querySelector('.prev').addEventListener('click', () => { ir(i - 1); reiniciar(); });
  hero.querySelector('.next').addEventListener('click', () => { ir(i + 1); reiniciar(); });
  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', reiniciar);
  ir(0); reiniciar();
}
