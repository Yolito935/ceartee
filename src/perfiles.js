// ==========================================
// PERFILES.JS - Sistema de perfiles locales para CEARTEE
// ==========================================

(function() {
  'use strict';

  window.PerfilesManager = {
    colores: ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#ffeaa7','#fd79a8','#a29bfe','#fab1a0'],

    obtenerPerfiles: function() {
      try { return JSON.parse(localStorage.getItem('ceartee_perfiles') || '[]'); }
      catch(e) { return []; }
    },

    guardarPerfiles: function(lista) {
      localStorage.setItem('ceartee_perfiles', JSON.stringify(lista));
    },

    crearPerfil: function(nombre, avatar) {
      var perfiles = this.obtenerPerfiles();
      var nuevo = {
        id: 'perf_' + Date.now(),
        nombre: nombre.trim() || 'Jugador',
        avatar: avatar || '👤',
        color: this.colores[Math.floor(Math.random() * this.colores.length)],
        creado: new Date().toISOString()
      };
      perfiles.push(nuevo);
      this.guardarPerfiles(perfiles);
      return nuevo;
    },

    eliminarPerfil: function(id) {
      var perfiles = this.obtenerPerfiles().filter(function(p){ return p.id !== id; });
      this.guardarPerfiles(perfiles);
      localStorage.removeItem('ceartee_config_' + id);
      localStorage.removeItem('ceartee_stats_' + id);
      var activo = localStorage.getItem('ceartee_perfil_activo');
      if (activo === id) localStorage.removeItem('ceartee_perfil_activo');
    },

    obtenerPerfilActivo: function() {
      var id = localStorage.getItem('ceartee_perfil_activo');
      if (!id) return null;
      return this.obtenerPerfiles().find(function(p){ return p.id === id; }) || null;
    },

    setPerfilActivo: function(id) {
      localStorage.setItem('ceartee_perfil_activo', id);
    },

    logout: function() {
      localStorage.removeItem('ceartee_perfil_activo');
    },

     obtenerDatos: function(perfilId, clave, defaultValue) {
      var key = 'ceartee_' + clave + '_' + perfilId;
      var raw = localStorage.getItem(key);
      if (raw) {
        try { return JSON.parse(raw); } catch(e) { return defaultValue; }
      }
      // Los perfiles nuevos empiezan limpios, SIN heredar nada
      return defaultValue;
    },
    guardarDatos: function(perfilId, clave, datos) {
      var key = 'ceartee_' + clave + '_' + perfilId;
      localStorage.setItem(key, JSON.stringify(datos));
    },

    getConfig: function() {
      var perfil = this.obtenerPerfilActivo();
      if (!perfil) {
        try { return JSON.parse(localStorage.getItem('appConfig') || '{}'); } catch(e){ return {}; }
      }
      return this.obtenerDatos(perfil.id, 'config', {});
    },

    setConfig: function(config) {
      var perfil = this.obtenerPerfilActivo();
      if (!perfil) { localStorage.setItem('appConfig', JSON.stringify(config)); return; }
      this.guardarDatos(perfil.id, 'config', config);
    },

    getStats: function() {
      var perfil = this.obtenerPerfilActivo();
      if (!perfil) {
        try { return JSON.parse(localStorage.getItem('notificacionesDatos') || '{}'); } catch(e){ return {}; }
      }
      return this.obtenerDatos(perfil.id, 'stats', {});
    },

    setStats: function(stats) {
      var perfil = this.obtenerPerfilActivo();
      if (!perfil) { localStorage.setItem('notificacionesDatos', JSON.stringify(stats)); return; }
      this.guardarDatos(perfil.id, 'stats', stats);
    }
  };

  // ==========================================
  // UI DE PERFILES (COMPACTA)
  // ==========================================
  window.renderPantallaPerfiles = function(contenedorId, onSeleccionar) {
    var contenedor = document.getElementById(contenedorId || 'app-container');
    if (!contenedor) contenedor = document.body;

    var perfiles = window.PerfilesManager.obtenerPerfiles();
    var perfilActivo = window.PerfilesManager.obtenerPerfilActivo();

    var html = `
      <div id="pantalla-perfiles" style="
        display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
        padding:20px 16px;font-family:'Poppins',sans-serif;rgba(102,126,234,0.4);
        background:transparent;border-radius:16px;max-width:400px;width:100%;margin:0 auto;
      ">
        <h2 style="font-size:22px;margin:0 0 4px;text-align:center;">¿Quién juega?</h2>
        <p style="opacity:0.7;margin:0 0 20px;font-size:13px;text-align:center;">Toca tu carita para comenzar</p>
        
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
          ${perfiles.map(function(p){
            var esActivo = perfilActivo && perfilActivo.id === p.id;
            return `
              <div class="tarjeta-perfil" data-id="${p.id}" style="
                position:relative;width:90px;height:110px;border-radius:14px;
                background:${esActivo ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.08)'};
                border:2px solid ${esActivo ? '#fff' : 'transparent'};
                display:flex;flex-direction:column;align-items:center;justify-content:center;
                cursor:pointer;transition:all 0.25s;
                box-shadow:${esActivo ? '0 4px 16px rgba(102,126,234,0.4)' : '0 2px 8px rgba(0,0,0,0.2)'};
              " onmouseover="this.style.transform='translateY(-4px) scale(1.05)'" 
                 onmouseout="this.style.transform='translateY(0) scale(1)'">
                
                <div class="btn-eliminar-perfil" data-id="${p.id}" style="
                  position:absolute;top:4px;right:4px;width:20px;height:20px;
                  border-radius:50%;background:rgba(255,255,255,0.15);
                  display:flex;align-items:center;justify-content:center;
                  cursor:pointer;font-size:11px;opacity:0.5;transition:all 0.2s;z-index:2;color:white;
                " onmouseover="this.style.opacity='1';this.style.background='rgba(255,107,107,0.9)'" 
                   onmouseout="this.style.opacity='0.5';this.style.background='rgba(255,255,255,0.15)'">✕</div>
                
                <div style="font-size:36px;margin-bottom:4px;">${p.avatar}</div>
                <div style="font-weight:700;font-size:12px;text-align:center;padding:0 6px;word-break:break-word;line-height:1.2;">${p.nombre}</div>
                ${esActivo ? '<div style="margin-top:3px;font-size:9px;opacity:0.9;">⭐</div>' : ''}
              </div>
            `;
          }).join('')}
          
          <div id="btn-nuevo-perfil" style="
            width:90px;height:110px;border-radius:14px;
            background:rgba(102,126,234,0.4);
            border:2px dashed rgba(255,255,255,0.6);
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            cursor:pointer;transition:all 0.25s;color:#ffffff;
          " onmouseover="this.style.background='rgba(102,126,234,0.6)';this.style.borderColor='#ffffff';this.style.transform='translateY(-4px)'" 
             onmouseout="this.style.background='rgba(102,126,234,0.4)';this.style.borderColor='rgba(255,255,255,0.6)';this.style.transform='translateY(0)'">
            <div style="font-size:32px;margin-bottom:2px;">+</div>
            <div style="font-weight:600;font-size:12px;">Nuevo</div>
          </div>
    `;

    contenedor.innerHTML = html;

    document.querySelectorAll('.tarjeta-perfil').forEach(function(el){
      el.addEventListener('click', function(e){
        if (e.target.classList.contains('btn-eliminar-perfil')) return;
        var id = this.getAttribute('data-id');
        window.PerfilesManager.setPerfilActivo(id);
        if (onSeleccionar) onSeleccionar(id);
        else window.location.href = 'Etapas.html';
      });
    });

    document.querySelectorAll('.btn-eliminar-perfil').forEach(function(el){
      el.addEventListener('click', function(e){
        e.stopPropagation();
        var id = this.getAttribute('data-id');
        var perfil = window.PerfilesManager.obtenerPerfiles().find(function(p){ return p.id === id; });
        mostrarConfirmacionEliminar(perfil, id, contenedorId, onSeleccionar);
      });
    });

    document.getElementById('btn-nuevo-perfil').addEventListener('click', function(){
      mostrarModalNuevoPerfil(contenedorId, onSeleccionar);
    });
  };

  function mostrarConfirmacionEliminar(perfil, id, contenedorId, onSeleccionar) {
    var modal = document.createElement('div');
    modal.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.85);z-index:999999;
      display:flex;align-items:center;justify-content:center;
      font-family:'Poppins',sans-serif;
    `;
    modal.innerHTML = `
      <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:28px;border-radius:20px;max-width:320px;width:85%;border:1px solid rgba(255,255,255,0.1);text-align:center;">
        <div style="font-size:40px;margin-bottom:10px;">🗑️</div>
        <h2 style="color:white;margin:0 0 6px;font-size:18px;">¿Eliminar perfil?</h2>
        <p style="color:#ff6b6b;font-size:17px;font-weight:700;margin-bottom:6px;">${perfil ? perfil.avatar + ' ' + perfil.nombre : ''}</p>
        <p style="color:#aaa;font-size:13px;margin-bottom:20px;line-height:1.4;">Se borrarán todos sus logros y progreso. No se puede deshacer.</p>
        <div style="display:flex;gap:10px;">
          <button id="btn-cancelar-eliminar" style="flex:1;padding:10px;border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:transparent;color:white;cursor:pointer;font-size:13px;font-weight:600;">Cancelar</button>
          <button id="btn-confirmar-eliminar" style="flex:1;padding:10px;border-radius:10px;border:none;background:linear-gradient(135deg,#ff6b6b,#ee5a24);color:white;cursor:pointer;font-size:13px;font-weight:600;">Sí, eliminar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('btn-cancelar-eliminar').addEventListener('click', function(){ modal.remove(); });
    document.getElementById('btn-confirmar-eliminar').addEventListener('click', function(){
      window.PerfilesManager.eliminarPerfil(id);
      modal.remove();
      window.renderPantallaPerfiles(contenedorId, onSeleccionar);
    });
  }

  function mostrarModalNuevoPerfil(contenedorId, onSeleccionar) {
    var avatales = ['👧','🧒','👦','👩','🧑','👨','🐱','🐶','🦊','🐼','🦁','🐯','🦄','🐸','🐙','🤖'];
    var modal = document.createElement('div');
    modal.id = 'modal-nuevo-perfil';
    modal.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.85);z-index:999999;
      display:flex;align-items:center;justify-content:center;
      font-family:'Poppins',sans-serif;
    `;
    modal.innerHTML = `
      <div style="background: linear-gradient(135deg, #8b0000, #8b0000); padding: 24px; border-radius: 20px; max-width: 360px; width: 90%; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
        <label style="color:#aaa;font-size:12px;display:block;margin-bottom:6px;">Nombre</label>
        <input type="text" id="input-nombre-perfil" maxlength="12" placeholder="Tu nombre" autocomplete="off" style="
          width:100%;padding:10px 14px;border-radius:10px;border:2px solid ;rgba(255,255,255,0.1);;
          background:rgba(255,255,255,0.1);color:white;font-size:15px;font-family:inherit;
          outline:none;margin-bottom:16px;box-sizing:border-box;
        ">
        <label style="color:#aaa;font-size:12px;display:block;margin-bottom:10px;">Elige un avatar</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px;">
          ${avatales.map(function(a){ return `
            <div class="opcion-avatar" data-avatar="${a}" style="
              width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.05);
              display:flex;align-items:center;justify-content:center;font-size:22px;
              cursor:pointer;transition:all 0.2s;border:2px solid transparent;
            ">${a}</div>
          `; }).join('')}
        </div>
        <div style="display:flex;gap:10px;">
          <button id="btn-cancelar-perfil" style="flex:1;padding:10px;border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:transparent;background:white;color:black;cursor:pointer;font-size:13px;font-weight:600;">Cancelar</button>
          <button id="btn-crear-perfil" style="flex:1;padding:10px;border-radius:10px;border:none;background:white;color:black;cursor:pointer;font-size:13px;font-weight:600;">¡Jugar!</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    // ✅ Limpiar input y forzar foco sin autocompletado
var inputNombre = document.getElementById('input-nombre-perfil');
if (inputNombre) {
  inputNombre.value = '';
  inputNombre.setAttribute('autocomplete', 'off');
}

    var avatarSeleccionado = '👤';
    modal.querySelectorAll('.opcion-avatar').forEach(function(el){
      el.addEventListener('click', function(){
        modal.querySelectorAll('.opcion-avatar').forEach(function(x){
          x.style.borderColor='transparent'; x.style.background='rgba(255,255,255,0.05)';
        });
        this.style.borderColor='#667eea'; this.style.background='rgba(102,126,234,0.2)';
        avatarSeleccionado = this.getAttribute('data-avatar');
      });
    });
    if (modal.querySelector('.opcion-avatar')) modal.querySelector('.opcion-avatar').click();

    document.getElementById('btn-cancelar-perfil').addEventListener('click', function(){ modal.remove(); });
    document.getElementById('btn-crear-perfil').addEventListener('click', function(){
      var nombre = document.getElementById('input-nombre-perfil').value.trim();
      if (!nombre) { document.getElementById('input-nombre-perfil').style.borderColor='#ff6b6b'; return; }
      var perfil = window.PerfilesManager.crearPerfil(nombre, avatarSeleccionado);
      window.PerfilesManager.setPerfilActivo(perfil.id);
      modal.remove();
      if (onSeleccionar) onSeleccionar(perfil.id);
      else window.location.href = 'Etapas.html';
    });
    document.getElementById('input-nombre-perfil').addEventListener('keydown', function(e){
      if (e.key === 'Enter') document.getElementById('btn-crear-perfil').click();
    });
    document.getElementById('input-nombre-perfil').focus();
  }

})();