const mensajesFinalPorActividad = {

  // === 4_Cuentos ===
  'portasa.ass' : { tipo: 'img', src: 'assets/Imagenes/bienvenida.gif' },
  'g1.puz'      : { tipo: 'img', src: 'assets/Imagenes/estupendo.gif' },
  'g2.puz'      : { tipo: 'img', src: 'assets/Imagenes/muyBien.gif' },
  'g11.ass'     : { tipo: 'img', src: 'assets/Imagenes/excelente.gif' },
  'g1.puz' : {tipo:'img', src: 'assets/Mensaje_final_imagenes/Excelente.gif'},

  // === Puedes poner texto en vez de imagen ===
  'g3.puz'      : { tipo: 'texto', src: '¡¡¡ Excelente trabajo !!!' },

};



// ==========================================
// CAMBIAR INSTRUCCIÓN CON ANIMACIÓN
// ==========================================
function cambiarInstruccion(texto) {
  const barra = document.getElementById('barra-instrucciones');
  if (!barra) return;
  if (barra.textContent === texto) return; // ← No hacer nada si es igual

  barra.style.transition = 'opacity 0.3s ease';
  barra.style.opacity    = '0';

  setTimeout(() => {
    barra.textContent   = texto;
    barra.style.opacity = '1';
  }, 300);
}

// ==========================================
// LLAMADA DESDE ESTADISTICA.JS
// ==========================================
function cambiarInstruccionPorNombre(nombreActividad) {
  console.log('📚 cambiarInstruccionPorNombre:', nombreActividad);
  try {
    const p          = window.JClicObject?.currentPlayers?.[0];
    const messages   = p?.actPanel?.act?.messages;
    const initialTxt = messages?.initial?.text || '';
    cambiarInstruccion('📚 ' + (initialTxt || nombreActividad));
  } catch(e) {
    console.error('Error:', e);
  }
}
function mostrarMensajeFinal(messages, proyecto) {
  const barra = document.getElementById('barra-instrucciones');
  if (!barra) return;

  // Obtener actividad actual
  const p               = window.JClicObject?.currentPlayers?.[0];
  const nombreActividad = p?.actPanel?.act?.name || '';

  // 1. Buscar en diccionario primero
  const entrada = mensajesFinalPorActividad[nombreActividad];
  if (entrada) {
    if (entrada.tipo === 'img') {
      barra.style.transition = 'opacity 0.3s ease';
      barra.style.opacity    = '0';
      setTimeout(() => {
        barra.innerHTML   = '';
        const img         = document.createElement('img');
        img.src           = entrada.src;
        img.style.cssText =
          'max-height:55px;max-width:250px;object-fit:contain;vertical-align:middle;';
        img.onerror = () => {
          barra.textContent = '🎉 ¡¡¡ Muy bien !!! 🎉';
        };
        barra.appendChild(img);
        barra.style.opacity = '1';
        console.log('✅ Imagen diccionario:', entrada.src);
      }, 300);
      return;
    }
    if (entrada.tipo === 'texto') {
      cambiarInstruccion('🎉 ' + entrada.src + ' 🎉');
      return;
    }
  }

  // 2. Si no está en diccionario buscar en JClic
  const finalTxt   = messages?.final?.text               || '';
  const finalAudio = messages?.final?.mediaContent?.file || '';

  if (finalTxt) {
    cambiarInstruccion('🎉 ' + finalTxt + ' 🎉');
    return;
  }

  if (finalAudio) {
    cambiarInstruccion('🎉 ' + finalAudio.replace(/\.(wav|mp3|ogg)$/i, '') + ' 🎉');
    return;
  }

  // 3. Texto por defecto
  cambiarInstruccion('🎉 ¡¡¡ Muy bien !!! 🎉');
}

// ==========================================
// OCULTAR INSTRUCCIONES NATIVAS DE JCLIC
// ==========================================
function ocultarInstruccionesJClic() {
  setInterval(() => {
    try {
      const jclic = document.querySelector('.JClic');
      if (!jclic) return;

      jclic.querySelectorAll('canvas').forEach(canvas => {
        if (canvas.width > canvas.height * 3) {
          canvas.style.setProperty('display', 'none', 'important');
        }
      });

      const coloresVerdes = [
        '0, 128, 0','34, 139, 34','0, 100, 0',
        '46, 125, 50','76, 175, 80','56, 142, 60'
      ];

      jclic.querySelectorAll('div').forEach(div => {
        const bg = window.getComputedStyle(div).backgroundColor;
        const h  = div.offsetHeight;
        const w  = div.offsetWidth;
        if (h > 0 && h < 60 && w > 200 &&
            coloresVerdes.some(c => bg.includes(c))) {
          div.style.setProperty('display', 'none', 'important');
        }
      });
    } catch(e) {}
  }, 300);
}

// ==========================================
// SINCRONIZAR CON JCLIC
// ==========================================
function sincronizarInstrucciones() {
  let ultimaActividad = '';
  let ultimoSolved    = false;
  let jclicListo      = false; // ← Flag para saber si JClic ya cargó

  setInterval(() => {
    try {
      const p = window.JClicObject?.currentPlayers?.[0];
      if (!p?.actPanel) return;

      const nombreActividad = p.actPanel?.act?.name || '';
      const solved          = p.actPanel.solved      || false;
      const messages        = p.actPanel.act?.messages;
      const initialTxt      = messages?.initial?.text || '';

      // ✅ Primera vez que JClic está listo
      if (!jclicListo && nombreActividad) {
        jclicListo      = true;
        ultimaActividad = nombreActividad;
        ultimoSolved    = false;
        console.log('✅ JClic listo. Actividad:', nombreActividad);
        cambiarInstruccion('📚 ' + (initialTxt || nombreActividad));
        return;
      }

      // ✅ CAMBIO DE ACTIVIDAD
      if (nombreActividad && nombreActividad !== ultimaActividad) {
        ultimaActividad = nombreActividad;
        ultimoSolved    = false;
        console.log('🎯 Nueva actividad:', nombreActividad);
        cambiarInstruccion('📚 ' + (initialTxt || nombreActividad));
        return;
      }

      // ✅ ACTIVIDAD COMPLETADA - solo una vez
      if (solved && !ultimoSolved) {
        ultimoSolved = true;
        console.log('🏆 Completada:', nombreActividad);
        mostrarMensajeFinal(messages, p.project);
        return;
      }

      // ✅ ACTIVIDAD RESETEADA
      if (!solved && ultimoSolved) {
        ultimoSolved = false;
        console.log('🔄 Reseteada:', nombreActividad);
        cambiarInstruccion('📚 ' + (initialTxt || nombreActividad));
      }

    } catch(e) {}
  }, 500);
}

// ==========================================
// INICIALIZAR
// ==========================================
window.addEventListener('load', () => {
  // Mostrar cargando solo al inicio
  const barra = document.getElementById('barra-instrucciones');
  if (barra) barra.textContent = '📚 Cargando...';

  ocultarInstruccionesJClic();
  sincronizarInstrucciones(); // ← Sin setTimeout, empieza ya
});



