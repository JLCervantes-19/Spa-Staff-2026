// ============================================================
// utils.js — Utilidades compartidas
// ============================================================

// Estados canónicos del sistema (sincronizados con el CHECK de la tabla citas)
// Colores sincronizados con los tokens --estado-* de staff.css
// (fuente canónica: SISTEMA WEB/design-tokens.css)
export const ESTADOS = {
  pendiente:         { label: 'Pendiente',           icon: '📋', color: '#AD74C3' },
  confirmada:        { label: 'Confirmada',          icon: '🔵', color: '#2563eb' },
  completada:        { label: 'Completada',          icon: '✅', color: '#16a34a' },
  no_asistio:        { label: 'No asistió',          icon: '❌', color: '#dc2626' },
  cancelada_cliente: { label: 'Cancelada (cliente)', icon: '🚫', color: '#c2410c' },
  cancelada_admin:   { label: 'Cancelada (admin)',   icon: '🚫', color: '#64748b' },
}

export function formatFecha(fecha) {
  if (!fecha) return '—'
  const d = new Date(fecha + 'T00:00:00')
  return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function formatFechaCorta(fecha) {
  if (!fecha) return '—'
  const d = new Date(fecha + 'T00:00:00')
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
}

export function formatHora(hora) {
  if (!hora || typeof hora !== 'string' || !hora.includes(':')) return '—'
  const [h, m] = hora.split(':')
  const hNum = parseInt(h, 10)
  const ampm = hNum >= 12 ? 'PM' : 'AM'
  const h12 = hNum % 12 || 12
  return `${h12}:${m} ${ampm}`
}

export function iniciales(nombre, apellido) {
  const n = (nombre || '').charAt(0).toUpperCase()
  const a = (apellido || '').charAt(0).toUpperCase()
  return n + a || '??'
}

export function sanitizeText(str) {
  if (!str) return ''
  return String(str).replace(/[<>&"']/g, (c) => {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]
  }).slice(0, 1000)
}

// Fecha actual en la zona horaria del spa (Bogotá).
// No usar toISOString(): devuelve la fecha UTC y desde las 7 PM
// hora Colombia salta al día siguiente.
function hoyBogota() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }))
}

export function isToday(fecha) {
  if (!fecha) return false
  return fecha === todayISO()
}

export function isThisWeek(fecha) {
  if (!fecha) return false
  const d = new Date(fecha + 'T00:00:00')
  const now = hoyBogota()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  return d >= startOfWeek && d <= endOfWeek
}

export function isThisMonth(fecha) {
  if (!fecha) return false
  const d = new Date(fecha + 'T00:00:00')
  const now = hoyBogota()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

export function todayISO() {
  const d = hoyBogota()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Toast global
let toastTimer = null
export function showToast(msg, type = 'default') {
  let el = document.getElementById('toast-global')
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast-global'
    el.className = 'toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.className = `toast ${type}`
  clearTimeout(toastTimer)
  requestAnimationFrame(() => {
    el.classList.add('show')
    toastTimer = setTimeout(() => el.classList.remove('show'), 5500)
  })
}

// ——— Modal helper ————————————————————————————————————————————
export function openModal(id)  { document.getElementById(id)?.classList.add('open') }
export function closeModal(id) { document.getElementById(id)?.classList.remove('open') }

// type: 'danger' (eliminar) | 'warning' (editar/modificar) | 'success' (crear/agregar)
const CONFIRM_ICONS = {
  danger:  `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
  warning: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>`,
  success: `<path d="M12 5v14M5 12h14"/>`,
}
const CONFIRM_BTN_CLASS = { danger: 'btn-danger', warning: 'btn-primary', success: 'btn-primary' }

export function confirmAction({ title, text, btnLabel = 'Confirmar', type = 'warning', onConfirm }) {
  let overlay = document.getElementById('confirm-overlay')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.id = 'confirm-overlay'
    overlay.innerHTML = `
      <div class="modal confirm-modal">
        <div class="modal-body">
          <div class="confirm-icon" id="confirm-icon"></div>
          <p class="confirm-title" id="confirm-title"></p>
          <p class="confirm-text" id="confirm-text"></p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="confirm-cancel">Cancelar</button>
          <button id="confirm-ok"></button>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open') })
    document.getElementById('confirm-cancel').addEventListener('click', () => overlay.classList.remove('open'))
  }
  document.getElementById('confirm-title').textContent = title
  document.getElementById('confirm-text').textContent  = text || ''

  const iconEl = document.getElementById('confirm-icon')
  iconEl.className = `confirm-icon ${type}`
  iconEl.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${CONFIRM_ICONS[type] || CONFIRM_ICONS.warning}</svg>`

  const btn = document.getElementById('confirm-ok')
  const fresh = btn.cloneNode(true)
  btn.parentNode.replaceChild(fresh, btn)
  fresh.className = CONFIRM_BTN_CLASS[type] || 'btn-primary'
  fresh.textContent = btnLabel
  fresh.addEventListener('click', async () => {
    overlay.classList.remove('open')
    await onConfirm()
  })
  overlay.classList.add('open')
}

// Render iniciales avatar
export function avatarHTML(empleada, size = 48) {
  if (empleada?.foto_url) {
    return `<img src="${empleada.foto_url}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)" alt="Avatar" onerror="this.outerHTML='${avatarInitialesHTML(empleada, size)}'" />`
  }
  return avatarInitialesHTML(empleada, size)
}

function avatarInitialesHTML(empleada, size) {
  const ini = iniciales(empleada?.nombre, empleada?.apellido)
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,var(--lilac-light),var(--lilac));display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:${size * 0.35}px;color:var(--purple-dark);font-weight:300;flex-shrink:0;border:2px solid var(--gold)">${ini}</div>`
}
