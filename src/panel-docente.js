// ==========================================
// PANEL DOCENTE - CEARTEE
// ==========================================

// 🔒 CONTRASEÑA DE ACCESO (cámbiala aquí)
const CONTRASENA_DOCENTE = 'ceartee2024';

// Verificar acceso
function verificarAcceso() {
  var input = document.getElementById('passwordInput');
  var error = document.getElementById('loginError');
  
  if (!input || !error) return;
  
  if (input.value === CONTRASENA_DOCENTE) {
    // Ocultar login, mostrar panel
    var overlay = document.getElementById('loginOverlay');
    var panel = document.getElementById('panelContainer');
    
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(function() { overlay.style.display = 'none'; }, 500);
    }
    if (panel) panel.style.display = 'block';
    
    // Renderizar datos
    renderizarPanel();
  } else {
    error.classList.add('visible');
    input.value = '';
    input.focus();
  }
}

// ==========================================
// RENDERIZAR PANEL CON TODOS LOS PERFILES
// ==========================================
function renderizarPanel() {
  if (!window.PerfilesManager) {
    console.error('PerfilesManager no disponible');
    return;
  }
  
  var perfiles = window.PerfilesManager.obtenerPerfiles();
  var tbody = document.getElementById('tbodyAlumnos');
  var vacio = document.getElementById('panelVacio');
  var totalSpan = document.getElementById('totalAlumnos');
  var orden = document.getElementById('ordenarPor')?.value || 'nombre';
  
  if (!tbody) return;
  
  // Actualizar contador
  if (totalSpan) {
    totalSpan.textContent = perfiles.length + (perfiles.length === 1 ? ' alumno' : ' alumnos');
  }
  
  // Si no hay perfiles
  if (perfiles.length === 0) {
    tbody.innerHTML = '';
    if (vacio) vacio.style.display = 'block';
    return;
  }
  
  if (vacio) vacio.style.display = 'none';
  
  // Enriquecer perfiles con stats
  var perfilesConStats = perfiles.map(function(p) {
    var stats = window.PerfilesManager.obtenerDatos(p.id, 'stats', {}) || {};
    var config = window.PerfilesManager.obtenerDatos(p.id, 'config', {}) || {};
    
    return {
      perfil: p,
      stats: stats,
      juegosCompletados: stats.juegosCompletados || 0,
      mejorPuntuacion: stats.mejorPuntuacion || 0,
      mejorRacha: stats.mejorRacha || 0,
      logrosCount: (stats.logrosDesbloqueados || []).length,
      logros: stats.logrosDesbloqueados || [],
      ultimaActividad: stats.ultimaActividad || p.creado
    };
  });
  
  // Ordenar
  perfilesConStats.sort(function(a, b) {
    switch(orden) {
      case 'juegos': return b.juegosCompletados - a.juegosCompletados;
      case 'puntuacion': return b.mejorPuntuacion - a.mejorPuntuacion;
      case 'reciente':
        var da = new Date(a.ultimaActividad || 0);
        var db = new Date(b.ultimaActividad || 0);
        return db - da;
      default: // nombre
        return a.perfil.nombre.localeCompare(b.perfil.nombre);
    }
  });
  
  // Renderizar filas
  tbody.innerHTML = perfilesConStats.map(function(item) {
    var p = item.perfil;
    var fecha = formatearFecha(item.ultimaActividad || p.creado);
    
    // Logros visuales (máximo 3 badges)
    var logrosHTML = '';
    if (item.logros.length > 0) {
      var nombresLogros = {
        'primer_juego': '🎮 1er juego',
        '5_juegos': '🥉 5 juegos',
        '10_juegos': '🥈 10 juegos',
        '25_juegos': '🥇 25 juegos',
        '50_juegos': '🏆 50 juegos',
        '100_juegos': '👑 100 juegos',
        'primera_perfecta': '⭐ 1ª perfecta',
        '10_perfectas': '💎 10 perfectas',
        'racha_3': '🔥 Racha 3',
        'racha_5': '🔥 Racha 5',
        'racha_10': '💥 Racha 10'
      };
      
      var badges = item.logros.slice(0, 3).map(function(l) {
        return '<span class="logro-badge">' + (nombresLogros[l] || l) + '</span>';
      }).join('');
      
      if (item.logros.length > 3) {
        badges += '<span class="logro-badge">+' + (item.logros.length - 3) + '</span>';
      }
      logrosHTML = badges;
    } else {
      logrosHTML = '<span class="logro-badge empty">Sin logros aún</span>';
    }
    
    return `
      <tr>
        <td>
          <div class="alumno-info">
            <div class="alumno-avatar" style="background:${p.color}20; border: 2px solid ${p.color}">
              ${p.avatar}
            </div>
            <div>
              <div class="alumno-nombre">${escaparHTML(p.nombre)}</div>
              <div class="alumno-id">${p.id.replace('perf_', '')}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="stat-cell">
            <span class="stat-numero">${item.juegosCompletados}</span>
            <span class="stat-label">completados</span>
          </div>
        </td>
        <td>
          <div class="stat-cell">
            <span class="stat-numero">${item.mejorPuntuacion}%</span>
            <span class="stat-label">mejor</span>
          </div>
        </td>
        <td>
          <div class="stat-cell">
            <span class="stat-numero">${item.mejorRacha}</span>
            <span class="stat-label">mejor racha</span>
          </div>
        </td>
        <td>
          <div class="logros-badges">${logrosHTML}</div>
        </td>
        <td>
          <span class="fecha-texto">${fecha}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// FILTRAR ALUMNOS POR NOMBRE
// ==========================================
function filtrarAlumnos() {
  var input = document.getElementById('buscadorAlumnos');
  var filtro = (input?.value || '').toLowerCase().trim();
  var filas = document.querySelectorAll('#tbodyAlumnos tr');
  
  filas.forEach(function(fila) {
    var nombre = fila.querySelector('.alumno-nombre')?.textContent?.toLowerCase() || '';
    if (nombre.includes(filtro)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// ==========================================
// UTILIDADES
// ==========================================
function formatearFecha(fechaISO) {
  if (!fechaISO) return 'Nunca';
  try {
    var d = new Date(fechaISO);
    var ahora = new Date();
    var diffMs = ahora - d;
    var diffMin = Math.floor(diffMs / 60000);
    var diffHoras = Math.floor(diffMs / 3600000);
    var diffDias = Math.floor(diffMs / 86400000);
    
    if (diffMin < 1) return 'Hace un momento';
    if (diffMin < 60) return 'Hace ' + diffMin + ' min';
    if (diffHoras < 24) return 'Hace ' + diffHoras + ' h';
    if (diffDias < 7) return 'Hace ' + diffDias + ' días';
    
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  } catch(e) {
    return 'Fecha desconocida';
  }
}

function escaparHTML(texto) {
  var div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ==========================================
// INICIALIZAR
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  // Enfocar input de password
  var input = document.getElementById('passwordInput');
  if (input) setTimeout(function() { input.focus(); }, 300);
});