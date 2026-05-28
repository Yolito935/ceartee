import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { getVersion } from '@tauri-apps/api/app';

async function iniciarUpdater() {
  try {
    const versionActual = await getVersion();
    console.log('[Updater] Versión actual:', versionActual);

    const update = await check();
    if (!update?.available) {
      console.log('[Updater] Todo actualizado');
      return;
    }

    console.log(`[Updater] Nueva versión: ${update.version}`);
    mostrarModalActualizacion(update);

  } catch (err) {
    console.error('[Updater] Error:', err);
  }
}

function mostrarModalActualizacion(update) {
  if (document.getElementById('updater-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'updater-modal';
  modal.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:100000;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,sans-serif;">
      <div style="background:linear-gradient(135deg,#1e3c72,#2a5298);color:#fff;padding:2.5rem;border-radius:20px;max-width:500px;width:90%;text-align:center;box-shadow:0 25px 80px rgba(0,0,0,0.6);">
        <div style="font-size:48px;margin-bottom:12px;">🎓</div>
        <h2 style="margin:0 0 8px;">Nueva versión disponible</h2>
        <p style="opacity:0.9;margin-bottom:4px;">CEARTEE <strong>${update.version}</strong> está lista.</p>
        <p style="opacity:0.75;font-size:0.95rem;margin-bottom:1.5rem;">${update.body || 'Incluye mejoras y nuevos contenidos.'}</p>
        
        <div id="upd-progress" style="display:none;margin:1.5rem 0;">
          <p style="font-size:0.9rem;margin-bottom:8px;">Descargando actualización...</p>
          <div style="width:100%;height:10px;background:rgba(255,255,255,0.15);border-radius:5px;overflow:hidden;">
            <div id="upd-bar" style="width:0%;height:100%;background:#00d26a;transition:width 0.2s;"></div>
          </div>
          <p id="upd-pct" style="font-size:0.85rem;margin-top:6px;opacity:0.9;">0%</p>
        </div>

        <div id="upd-buttons" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button id="btn-upd-now" style="background:#00d26a;color:#002;border:none;padding:14px 32px;border-radius:10px;font-weight:bold;font-size:1rem;cursor:pointer;">Actualizar ahora</button>
          <button id="btn-upd-later" style="background:rgba(255,255,255,0.15);color:#fff;border:none;padding:14px 24px;border-radius:10px;cursor:pointer;font-size:1rem;">Más tarde</button>
        </div>
        <p id="upd-status" style="margin-top:1rem;font-size:0.85rem;min-height:1.2rem;color:#a5d8ff;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('btn-upd-later').addEventListener('click', () => {
    modal.remove();
  });

  document.getElementById('btn-upd-now').addEventListener('click', async () => {
    document.getElementById('upd-buttons').style.display = 'none';
    document.getElementById('upd-progress').style.display = 'block';

    try {
      let descargado = 0;
      
      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            document.getElementById('upd-status').textContent = 'Iniciando descarga...';
            break;
          case 'Progress':
            if (event.data.chunkLength) descargado += event.data.chunkLength;
            if (event.data.contentLength > 0) {
              const pct = Math.min(100, Math.round((descargado / event.data.contentLength) * 100));
              document.getElementById('upd-bar').style.width = pct + '%';
              document.getElementById('upd-pct').textContent = pct + '%';
            }
            break;
          case 'Finished':
            document.getElementById('upd-status').textContent = 'Descarga completada. Instalando...';
            break;
        }
      });

      document.getElementById('upd-status').innerHTML = '<span style="color:#00d26a;font-weight:bold;">✓ Listo. Reiniciando...</span>';
      setTimeout(() => relaunch(), 1500);

    } catch (err) {
      document.getElementById('upd-status').innerHTML = `<span style="color:#ff6b6b;">Error: ${err.message}</span>`;
      document.getElementById('upd-buttons').style.display = 'flex';
      document.getElementById('btn-upd-now').textContent = 'Reintentar';
    }
  });
}

// Esperar 5 segundos después de cargar la página para no molestar al inicio
setTimeout(iniciarUpdater, 5000);
