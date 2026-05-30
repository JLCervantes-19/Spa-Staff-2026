// ============================================================
// utils.js — Utilidades compartidas
// ============================================================

export const ESTADOS = {
  pendiente:   { label: 'Pendiente',   icon: '📋', color: '#AD74C3' },
  realizada:   { label: 'Realizada',   icon: '✅', color: '#22c55e' },
  atrasada:    { label: 'Atrasada',    icon: '⏰', color: '#f59e0b' },
  no_asistio:  { label: 'No asistió',  icon: '❌', color: '#ef4444' },
  cancelada:   { label: 'Cancelada',   icon: '🚫', color: '#9ca3af' },
  confirmada:  { label: 'Confirmada',  icon: '🔵', color: '#3b82f6' },
  en_proceso:  { label: 'En proceso',  icon: '🔄', color: '#f59e0b' },
  reagendada:  { label: 'Reagendada',  icon: '📅', color: '#8b5cf6' },
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

export function isToday(fecha) {
  if (!fecha) return false
  const today = new Date().toISOString().split('T')[0]
  return fecha === today
}

export function isThisWeek(fecha) {
  if (!fecha) return false
  const d = new Date(fecha + 'T00:00:00')
  const now = new Date()
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
  const now = new Date()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

export function todayISO() {
  return new Date().toISOString().split('T')[0]
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
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000)
  })
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
