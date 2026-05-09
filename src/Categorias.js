const boton2 = document.querySelector('.btn-back');
if (boton2) {
  boton2.addEventListener('click', () => {
    cearteeNavigate('Etapas.html');
  });
}

const puzzle = document.querySelector('.category-card');
if (puzzle) {
  puzzle.addEventListener('click', () => {
    cearteeNavigate('Lenguajes.html');
  });
}

function playGame(nombre, rutaZip) {
  const url = 'vista.html?actividad=' + encodeURIComponent(rutaZip) + '&nombre=' + encodeURIComponent(nombre);
  console.log('🎮 Abriendo juego:', url);
  cearteeNavigate(url);
}

// ==========================================
// 🔊 SONIDO UI PORTÁTIL
// ==========================================
function reproducirSonidoUI(tipo) {
  try {
    let ctx = window._ctx || window._audioCtx;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      window._ctx = ctx;
    }
    if (ctx.state === 'suspended') ctx.resume();
    let vol = 0.7;
    try {
      const c = JSON.parse(localStorage.getItem('appConfig') || '{}');
      vol = ((c.volumenJuego != null ? c.volumenJuego : 70) / 100);
    } catch(e) {}
    if (vol === 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (tipo === 'accion') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.07);
      gain.gain.setValueAtTime(0.1 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch(e) {}
}