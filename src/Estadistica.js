// ==========================================
// ESTADISTICA.JS - Diccionario Seguro (Solo Actividades)
// ==========================================

// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
// DICCIONARIO: Escribe aquí los nombres EXACTOS de las últimas actividades
// IMPORTANTE: Solo funcionará con el NOMBRE DE LA ACTIVIDAD, no del proyecto
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
window.ULTIMAS_ACTIVIDADES_DICCIONARIO = [

  //Lenguajes

  "bp6.puz", //4cuentos
  "kas1.ass", //Actividad 5 años infantil
  "n_3.puz", //Actividad a leer con l,m,s,p,t,n
  "macepuz.puz",//Aprendo jugando
  "6peresc.ass", //Caperuticta roja
  "56.ass", //Diferentes objetos
  "sop1.sop",//El polito chiqui
  "epeix.ass", // El soldadito de plomo
  "l.sop", //Iniciacion a la lectura
  "seca1md.puz",//Jack y las habichuelas magicas
  "compren7.sop",// La gaviota de la coviña
  "personaj.ass",//Los cuentos del lobo
  "anim09/24ani203.ass",//Nombre de los animales
  "manolo12.ass",//Números y letras
  "series4.ass",//Las Vocales
  


  //Saberes y pensamiento cienficio

  "valores1.ass",//Actividad infantil 3 años
  "familia.puz",//Actividad infantil 4 años
  "8dir2.ass",// Actividades de orientacion especial
  "bloc_mc5.ass",//Actividades de lógica 1 
  "blofcm21.ass",//Actividades de logica 2
  "pc_nosw3.ass",//Activiadades de logica 3 
  "porta.ass",//Animales salvajes
  "formes21.ass",//Bloques logicos
  "num7_9_9.ass",//Calculos y numeros del 1 al 9
  "pm5plou.puz",//Clic de las medidas
  "pvee0.ass",//Clic de las posiciones
  "aliment.ass",//Colores y formas
  "6789tris.ass",//Conceptos basicos
   "comp23.ass",//Contar del 1 al 9
   "desco104.ass",//Descompisicion de numeros 0-10
   "nens.puz",//Direccionalidad, colores y formas
   "num0g.puz",//El cuento de los numeros 0-9 No funciona tiene bug aparece al principio de la actividad y ya no vuelve aparecer ya que se aparecio en la portada
   "parejas.puz",//El verano
   "55.ass",//Formas y mas formas
   "54.ass",//iguales
   "despues.ass",//Jugando con numeros 
   "9joc.ass",//Jugando con numeros 2 
   "pnu5.puz",//Las regletas
   "trenca4.puz",//Logica,numeracion y lateralidad
   "l5.puz",//Los 3 osos
   "acnina6.puz",//nina la gallina
   "txiki30.puz",//Ordenar tamaños
   "gnoms2.ass",//Producto cartesiano
   "Secuen79.pac",//Secuecias Tiene bug aparece en me dio de la secuencia 2
   "lluna.puz",//series
   "59.ass",//Sombras Tiene bug aparece en las actividades de la mitad de 5 años
   "p5q18.txa",//Tiempo, espacio y cantidad
   "ass025.ass",//Uno,dos,tres o ninguno


   //Etica,naturalez y sociedades
   "Contenedor.ass",//Aprendiendo a reciclar
   "hipulls.ass",//Elefante y otros grandes
   "dreta3.ass",//La ratita presumida
   "frase20.ass",//Los musicos de bremen
   "tran15.ass",//Los medios de transporte
   "relacio/h.ass",//Observa y relaciona
   "tele.sop",//Once upon a time
   "boda2.puz",//Otros niños del mundo No aparece
   "tucan4.puz",//Puzzle de animales
   "soni10.ass",//Reconocimiento de sonidos
   

   //De lo humano a comunitario

   "orde2.puz",//Cuento para la tolerancia
   "p312e.puz"//Los rincones de la clase








  
  
  

];
// 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆

window.tiempoSegundos           = 0;
window.relojInterval            = null;
window.syncInterval             = null;
window.acumuladorInterval       = null;
window.ultimoScore              = -1;
window.ultimoActions            = -1;
window.prevIdx                  = -1;
window.prevName                 = '';
window.registroActividades      = [];
window.tiempoInicioActividad    = null;
window.ultimaActividadDetectada = '';
window.reporteMostrado          = false;
window.juegoTerminado           = false;
window.datosActividadActual     = { score: 0, actions: 0, maxScore: 0, maxActions: 0, solved: false };
window.totalActividades         = 0;
window.yaIniciado               = false; // NUEVO: Evitar detección prematura

// ==========================================
// BUSCAR JCLIC (Incluye Iframes)
// ==========================================
function getJClic() {
  if (window.JClicObject) return window.JClicObject;
  try {
    const iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow && iframes[i].contentWindow.JClicObject) {
        return iframes[i].contentWindow.JClicObject;
      }
    }
  } catch(e) {}
  try {
    for (let i = 0; i < window.frames.length; i++) {
      if (window.frames[i] && window.frames[i].JClicObject) {
        return window.frames[i].JClicObject;
      }
    }
  } catch(e) {}
  return null;
}

// ==========================================
// VERIFICAR SI ESTÁ EN EL DICCIONARIO
// ==========================================
function esActividadFinal(nombreActividad) {
  if (!nombreActividad) return false;
  if (nombreActividad.length < 3) return false;

  const nombreLower = nombreActividad.toLowerCase().trim();

  return window.ULTIMAS_ACTIVIDADES_DICCIONARIO.some(entrada => {
    const entradaLower = entrada.toLowerCase().trim();

    // ✅ REGLA 1: Coincidencia exacta total
    if (nombreLower === entradaLower) return true;

    // ✅ REGLA 2: El nombre termina con /entrada (ruta completa)
    if (nombreLower.endsWith('/' + entradaLower)) return true;

    // ✅ REGLA 3: La entrada contiene "/" y coincide exactamente
    if (entradaLower.includes('/') && nombreLower === entradaLower) return true;

    return false;
  });
}
// ==========================================
// ACTUALIZAR PANEL
// ==========================================
function actualizarPanel(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;
  const txt = String(valor);
  if (el.textContent !== txt) {
    el.textContent = txt;
    el.classList.remove('aumento');
    void el.offsetWidth;
    el.classList.add('aumento');
  }
}

// ==========================================
// RELOJ
// ==========================================
function iniciarReloj() {
  // Verificar configuración de autoTimer
  try {
    var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
    if (config.autoTimer === false) {
      console.log('⏱️ Temporizador desactivado por configuración');
      actualizarPanel('tiempo', '--:--');
      return;
    }
  } catch(e) {}

  if (window.relojInterval) clearInterval(window.relojInterval);
  window.tiempoSegundos = 0;
  window.relojInterval = setInterval(() => {
    window.tiempoSegundos++;
    const m  = String(Math.floor(window.tiempoSegundos / 60)).padStart(2, '0');
    const s  = String(window.tiempoSegundos % 60).padStart(2, '0');
    actualizarPanel('tiempo', `${m}:${s}`);
  }, 1000);
}

// ==========================================
// OBTENER DATOS
// ==========================================
function obtenerNombreActividad(JClic) {
  try {
    const p   = JClic.currentPlayers?.[0];
    const seq = p?.project?.activitySequence;
    const idx = seq?.currentAct ?? -1;
    if (idx >= 0 && seq?.elements?.[idx]) {
      const e = seq.elements[idx];
      const nombre = (e?.activity || e?.activityName || e?.name || '').trim();
      if (nombre) return nombre;
    }
    return (p?.actPanel?.act?.name || '').trim();
  } catch(e) { return ''; }
}

function obtenerSecuencia(JClic) {
  try { return JClic?.currentPlayers?.[0]?.project?.name || 'Juego'; } 
  catch(e) { return 'Juego'; }
}

// ==========================================
// ACUMULADOR
// ==========================================
function iniciarAcumulador() {
  if (window.acumuladorInterval) clearInterval(window.acumuladorInterval);
  window.acumuladorInterval = setInterval(() => {
    const JClic = getJClic();
    if (!JClic) return;
    try {
      const p = JClic.currentPlayers?.[0];
      if (!p) return;
      const cv = p.counterVal;
      const scoreAhora = parseInt(cv?.score ?? p.score ?? 0) || 0;
      const actionsAhora = parseInt(cv?.actions ?? p.actions ?? 0) || 0;
      if (scoreAhora > window.datosActividadActual.maxScore) window.datosActividadActual.maxScore = scoreAhora;
      if (actionsAhora > window.datosActividadActual.maxActions) window.datosActividadActual.maxActions = actionsAhora;
      if (p?.actPanel?.solved || p?.actPanel?.act?.solved) window.datosActividadActual.solved = true;
    } catch(e) {}
  }, 100);
}

// ==========================================
// REGISTRAR ACTIVIDAD
// ==========================================
function registrarActividad(nombre, datos, tiempoActividad) {
  if (!nombre) return;
  if (window.registroActividades.find(r => r.actividad === nombre)) return;

  const score  = datos?.maxScore || 0;
  const solved = datos?.solved   || false;
  let puntuacion = solved ? 100 : [0, 50, 60, 70, 80, 90][score] || 100;
  if (!solved && score <= 5) puntuacion = [0, 50, 60, 70, 80, 90][score];

  const t    = tiempoActividad || 0;
  const minR = String(Math.floor(t / 60)).padStart(2, '0');
  const secR = String(t % 60).padStart(2, '0');

  const JClic = getJClic();
  window.registroActividades.push({
    secuencia  : obtenerSecuencia(JClic),
    actividad  : nombre,
    correcta   : (solved || score > 0) ? 'Sí' : 'No',
    acciones   : score,
    puntuacion : puntuacion,
    tiempo     : t,
    tiempoFmt  : `${minR}:${secR}`
  });
  
  console.log('📋 Registrada:', nombre, '| Score:', score, '| Solved:', solved);
}

// ==========================================
// FINALIZAR JUEGO
// ==========================================
function finalizarJuego() {
  // ✅ FIX: Prevenir doble ejecución
  if (window.juegoTerminado) return;
  window.juegoTerminado = true;
  
  // ... resto de tu código ...
  
  // Llamada a notificaciones (solo una vez)
  try {
    var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
    var totalActs = window.registroActividades.length;
    var correctas = window.registroActividades.filter(function(r) { return r.correcta === 'Sí'; }).length;
    var puntMedia = totalActs > 0 ? Math.round(window.registroActividades.reduce(function(s, r) { return s + r.puntuacion; }, 0) / totalActs) : 0;
    var nombreJuego = document.getElementById('gameTitle')?.textContent || '';
    
    if (window.Notificaciones) {
      window.Notificaciones.registrarJuego(nombreJuego, puntMedia, window.tiempoSegundos, correctas, totalActs);
    }
  } catch(e) {
    console.warn('Error notificaciones:', e);
  }

  setTimeout(mostrarReporteFinal, 10);
}

function mostrarPuntuacionTiempoReal() {
  try {
    var config = JSON.parse(localStorage.getItem('appConfig') || '{}');
    if (config.realtimeStats === false) return false;
  } catch(e) {}
  return true;
}
// ==========================================
// SINCRONIZACIÓN
// ==========================================
function iniciarSync() {
  if (window.syncInterval) clearInterval(window.syncInterval);

  window.syncInterval = setInterval(() => {
    const JClic = getJClic();
    if (!JClic) return;

    try {
      const p = JClic.currentPlayers?.[0];
      if (!p) return;

      const seq = p.project?.activitySequence;
      if (!seq?.elements?.length) return;

      // ==========================================
      // 🔍 DEBUG: Mostrar TODAS las actividades del juego actual
      // ==========================================
      if (window.totalActividades === 0) {
        window.totalActividades = seq.elements.length;
        console.log('✅ Total de actividades:', window.totalActividades);
        
        // 👇 NUEVO: Listar TODAS las actividades con su índice
        console.log('📋 LISTA COMPLETA DE ACTIVIDADES:');
        seq.elements.forEach((el, idx) => {
          const nombre = (el?.activity || el?.activityName || el?.name || 'SIN NOMBRE').trim();
          const esUltima = idx === seq.elements.length - 1;
          console.log(`  ${idx}: "${nombre}" ${esUltima ? '⭐ ÚLTIMA' : ''}`);
        });
      }

      const cv      = p.counterVal;
      const score   = parseInt(cv?.score   ?? p.score   ?? 0) || 0;
      const actions = parseInt(cv?.actions ?? p.actions ?? 0) || 0;
      const errores = Math.max(0, actions - score);

      if (score   !== window.ultimoScore)   { window.ultimoScore   = score;   if (mostrarPuntuacionTiempoReal()) actualizarPanel('aciertos', score); }
      if (errores !== window.ultimoActions) { window.ultimoActions = errores; if (mostrarPuntuacionTiempoReal()) actualizarPanel('intentos', errores); }

// Racha de aciertos
      if (window.Notificaciones) {
        if (score > window.ultimoScore && score > 0) window.Notificaciones.registrarAcierto();
        if (errores > window.ultimoActions && errores > 0) window.Notificaciones.registrarError();
      }


      const currentIdx  = seq.currentAct ?? -1;
      const currentName = obtenerNombreActividad(JClic);

      if (!currentName || currentName.length < 2) return;

      if (!window.yaIniciado && currentName) {
        window.yaIniciado               = true;
        window.prevName                 = currentName;
        window.prevIdx                  = currentIdx;
        window.ultimaActividadDetectada = currentName;
        window.tiempoInicioActividad    = Date.now();
        console.log('🎮 Juego iniciado en:', currentName);
        return;
      }

      const cambioPantalla = (currentIdx !== window.prevIdx) || (currentName !== window.prevName);


    if (cambioPantalla && window.yaIniciado && window.prevName) {
        if (window.sistemaSonido) window.sistemaSonido.playNotificacion();
      }
      if (cambioPantalla) {
        if (window.prevName && window.yaIniciado) {
          const t = window.tiempoInicioActividad
            ? Math.floor((Date.now() - window.tiempoInicioActividad) / 1000)
            : 0;
          registrarActividad(window.ultimaActividadDetectada, window.datosActividadActual, t);

         // ✅ FIX: Usar índice O diccionario (lo que ocurra primero)
          const anteriorEraUltimaPorIndice = (window.prevIdx === window.totalActividades - 1);
          const anteriorEraUltimaPorDiccionario = esActividadFinal(window.prevName);

          console.log(`🔍 Check: prevIdx=${window.prevIdx} | total-1=${window.totalActividades - 1} | esUltimaIndice=${anteriorEraUltimaPorIndice} | esUltimaDiccionario=${anteriorEraUltimaPorDiccionario} | nombre="${window.prevName}"`);

          if ((anteriorEraUltimaPorIndice || anteriorEraUltimaPorDiccionario) && !window.juegoTerminado) {
            if (anteriorEraUltimaPorDiccionario) {
              console.log('🏁 FIN REAL por DICCIONARIO:', window.prevName);
            } else {
              console.log('🏁 FIN REAL por ÍNDICE:', window.prevName);
            }
            finalizarJuego();
            return;
          }
        }

        window.datosActividadActual     = { score:0, actions:0, maxScore:0, maxActions:0, solved:false };
        window.ultimaActividadDetectada = currentName;
        window.prevIdx                  = currentIdx;
        window.prevName                 = currentName;
        window.tiempoInicioActividad    = Date.now();
        window.ultimoScore              = -1;
        window.ultimoActions            = -1;

        if (typeof cambiarInstruccionPorNombre === 'function') {
          cambiarInstruccionPorNombre(currentName);
        }

        console.log(`🔵 Actividad: "${currentName}" (Índice: ${currentIdx}/${window.totalActividades - 1})`);
      }

    } catch(e) {
      console.error('❌ Error en sync:', e);
    }
  }, 200);
}

// ==========================================
// REPORTE FINAL (con botón Imprimir/PDF)
// ==========================================
function mostrarReporteFinal() {
  const anterior = document.getElementById('modal-reporte');
  if (anterior) anterior.remove();

  if (window.registroActividades.length === 0) return;

  const totalActs        = window.registroActividades.length;
  const totalCorrectas   = window.registroActividades.filter(r => r.correcta === 'Sí').length;
  const totalAcciones    = window.registroActividades.reduce((s, r) => s + r.acciones, 0);
  const totalTiempo      = window.registroActividades.reduce((s, r) => s + r.tiempo, 0);
  const puntMedia        = Math.round(window.registroActividades.reduce((s, r) => s + r.puntuacion, 0) / totalActs);
  const porcentCorrectas = Math.round((totalCorrectas / totalActs) * 100);
  const minT             = String(Math.floor(totalTiempo / 60)).padStart(2, '0');
  const secT             = String(totalTiempo % 60).padStart(2, '0');
  const nombreJuego      = document.getElementById('gameTitle')?.textContent || 'Juego';
  const fechaHoy         = new Date().toLocaleDateString();

  const filas = window.registroActividades.map(r => {
    const colorFila     = r.correcta === 'Sí' ? '#e8f5e9' : '#ffebee';
    const colorCorrecta = r.correcta === 'Sí' ? '#1a1a2e' : '#1a1a2e'; // ✅ Negro para ambos
    return `
      <tr style="background:${colorFila};border-bottom:1px solid #ddd;">
        <td style="padding:8px 12px;color:#1a1a2e;">${r.secuencia}</td>
        <td style="padding:8px 12px;color:#1a1a2e;">${r.actividad}</td>
        <td style="padding:8px 12px;text-align:center;color:${colorCorrecta};font-weight:bold;">
          ${r.correcta === 'Sí' ? '✅ Sí' : '❌ No'}
        </td>
        <td style="padding:8px 12px;text-align:center;color:#1a1a2e;">${r.acciones}</td>
        <td style="padding:8px 12px;text-align:center;color:#1a1a2e;">${r.puntuacion}%</td>
        <td style="padding:8px 12px;text-align:center;color:#1a1a2e;">${r.tiempoFmt}</td>
      </tr>`;
  }).join('');
  // Contenedor imprimible (solo esto va al PDF)
  const reporteHTML = `
    <div id="reporte-imprimible" style="font-family:Arial,sans-serif;color:#1a1a2e;padding:20px;">
      <div style="text-align:center;margin-bottom:20px;">
        <h1 style="margin:0;font-size:24px;color:#667eea;">📊 Reporte de Actividades</h1>
        <p style="margin:4px 0;color:#666;font-size:14px;">${nombreJuego} · ${fechaHoy}</p>
      </div>
      
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#f8f9fa;border-radius:10px;overflow:hidden;">
        <tr style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;">
          <td style="padding:12px 16px;font-weight:bold;">📋 Totales</td>
          <td style="padding:12px 16px;text-align:center;"><strong>${totalCorrectas}</strong> correctas (${porcentCorrectas}%)</td>
          <td style="padding:12px 16px;text-align:center;">${totalAcciones} acciones</td>
          <td style="padding:12px 16px;text-align:center;">${puntMedia}%</td>
          <td style="padding:12px 16px;text-align:center;">⏱ ${minT}:${secT}</td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#e0e0e0;color:#1a1a2e;">
            <th style="padding:12px;text-align:left;">Secuencia</th>
            <th style="padding:12px;text-align:left;">Actividad</th>
            <th style="padding:12px;text-align:center;">Correcta</th>
            <th style="padding:12px;text-align:center;">Acciones</th>
            <th style="padding:12px;text-align:center;">Puntuación</th>
            <th style="padding:12px;text-align:center;">Tiempo</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      
      <div style="margin-top:30px;text-align:center;color:#999;font-size:12px;">
        Generado por CEARTEE · Reporte de progreso educativo
      </div>
    </div>
  `;

  const modalHTML = `
    <div id="modal-reporte" style="position:fixed!important;top:0!important;left:0!important;
      width:100vw!important;height:100vh!important;background:rgba(0,0,0,0.85)!important;
      z-index:2147483647!important;display:flex!important;align-items:center!important;
      justify-content:center!important;font-family:Arial,sans-serif!important;">
      <div style="background:white;border-radius:20px;max-width:900px;width:95%;max-height:88vh;
        overflow:hidden;display:flex;flex-direction:column;box-shadow:0 25px 60px rgba(0,0,0,0.5);">
        
        <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:20px 24px;display:flex;
          align-items:center;justify-content:space-between;border-radius:20px 20px 0 0;">
          <h2 style="color:white;margin:0;font-size:20px;">📊 Reporte de Actividades</h2>
          <button onclick="cerrarReporte()" style="background:rgba(255,255,255,0.2);border:2px solid white;
            color:white;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;font-weight:bold;">X</button>
        </div>

        <div style="overflow-y:auto;flex:1;padding:24px;">
          ${reporteHTML}
        </div>

        <div style="padding:20px 24px;text-align:center;border-top:2px solid #e5e7eb;background:#f9fafb;
          border-radius:0 0 20px 20px;display:flex;gap:15px;justify-content:center;">
          <button onclick="imprimirReporte()" style="background:linear-gradient(135deg,#667eea,#764ba2);
            color:white;border:none;padding:12px 30px;border-radius:25px;font-size:16px;font-weight:600;cursor:pointer;">
            📄 Imprimir / Guardar PDF
          </button>
          <button onclick="reiniciarDesdeReporte()" style="background:linear-gradient(135deg,#27ae60,#2ecc71);
            color:white;border:none;padding:12px 30px;border-radius:25px;font-size:16px;font-weight:600;cursor:pointer;">
            🔄 Jugar de nuevo
          </button>
          <button onclick="cerrarReporte()" style="background:#ddd;color:#333;border:none;padding:12px 30px;
            border-radius:25px;font-size:16px;cursor:pointer;">
            ✅ Cerrar
          </button>
        </div>
      </div>
    </div>`;

  document.documentElement.insertAdjacentHTML('beforeend', modalHTML);
  
  // Guardar el HTML limpio para imprimir después
  window.__reporteParaImprimir = reporteHTML;
}

// ==========================================
// IMPRIMIR REPORTE (PDF o físico)
// ==========================================
function imprimirReporte() {
  if (!window.__reporteParaImprimir) return;

  // ✅ SOLUCIÓN: Usar iframe oculto en vez de window.open()
  // Esto evita el popup blocker de Tauri y funciona en el .exe
  var iframeId = 'iframe-imprimir-reporte';
  var iframeAnterior = document.getElementById(iframeId);
  if (iframeAnterior) iframeAnterior.remove();

  var iframe = document.createElement('iframe');
  iframe.id = iframeId;
  iframe.style.cssText = 'position:fixed;bottom:0;right:0;width:1px;height:1px;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);

  var doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reporte CEARTEE</title>
      <style>
        @page { size: auto; margin: 15mm; }
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          padding: 20px; 
          color: #1a1a2e;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header { text-align: center; margin-bottom: 25px; }
        .header h1 { margin: 0; font-size: 26px; color: #667eea; }
        .header p { margin: 5px 0 0; color: #666; font-size: 14px; }
        .resumen { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 25px;
          background: #f8f9fa;
          border-radius: 10px;
          overflow: hidden;
        }
        .resumen td { 
          padding: 14px 16px; 
          text-align: center; 
          font-size: 14px;
        }
        .resumen td:first-child { 
          background: linear-gradient(135deg,#667eea,#764ba2); 
          color: white; 
          font-weight: bold;
          text-align: left;
        }
        table.detalle { 
          width: 100%; 
          border-collapse: collapse; 
          font-size: 13px;
        }
        table.detalle th { 
          background: #e0e0e0; 
          color: #1a1a2e; 
          padding: 12px; 
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #764ba2;
        }
        table.detalle td { 
          padding: 10px 12px; 
          border-bottom: 1px solid #eee;
        }
        table.detalle tr:nth-child(even) { background: #fafafa; }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          font-size: 11px; 
          color: #999; 
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      ${window.__reporteParaImprimir}
      <div class="footer">
        Generado por CEARTEE · Reporte de progreso educativo
      </div>
    </body>
    </html>
  `);
  doc.close();

  // Esperar a que el iframe renderice y luego imprimir
  setTimeout(function() {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch(e) {
      console.error('Error al imprimir:', e);
    }
    
    // Limpiar iframe después de un tiempo
    setTimeout(function() {
      var el = document.getElementById(iframeId);
      if (el) el.remove();
    }, 60000); // Mantener 1 minuto por si el usuario cancela y quiere reintentar
  }, 500);
}

// ==========================================
// CERRAR Y REINICIAR
// ==========================================
function cerrarReporte() {
  const modal = document.getElementById('modal-reporte');
  if (modal) {
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
  window.__reporteParaImprimir = null;
}

function reiniciarDesdeReporte() {
  cerrarReporte();
  setTimeout(() => window.location.reload(), 300);
}

// ==========================================
// INICIALIZADOR
// ==========================================
function arrancarEstadisticas() {
  if (window.relojInterval) clearInterval(window.relojInterval);
  if (window.syncInterval) clearInterval(window.syncInterval);
  if (window.acumuladorInterval) clearInterval(window.acumuladorInterval);

  window.registroActividades      = [];
  window.tiempoInicioActividad    = null;
  window.ultimaActividadDetectada = '';
  window.prevIdx                  = -1;
  window.prevName                 = '';
  window.reporteMostrado          = false;
  window.juegoTerminado           = false;
  window.yaIniciado               = false;
  window.totalActividades         = 0;
  window.datosActividadActual     = { score:0, actions:0, maxScore:0, maxActions:0, solved:false };
  window.tiempoSegundos           = 0;
  window.ultimoScore              = -1;
  window.ultimoActions            = -1;

  if (mostrarPuntuacionTiempoReal()) {
    actualizarPanel('aciertos', 0);
    actualizarPanel('intentos', 0);
  } else {
    actualizarPanel('aciertos', '-');
    actualizarPanel('intentos', '-');
  }
  actualizarPanel('tiempo',   '00:00');
  
  iniciarReloj();
  iniciarSync();
  iniciarAcumulador();
}

window.addEventListener('load', () => {
  setTimeout(arrancarEstadisticas, 2000);
});