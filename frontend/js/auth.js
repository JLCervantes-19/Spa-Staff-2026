// ============================================================
// auth.js — Helpers de autenticación
// ============================================================
import { supabase } from './supabase-client.js'

// Intentos de login: rate-limiting en cliente (máx 10 en 15 min)
const LOGIN_MAX = 10
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const RL_KEY = 'staff_login_attempts'

function getAttempts() {
  try {
    const raw = sessionStorage.getItem(RL_KEY)
    if (!raw) return { count: 0, first: Date.now() }
    return JSON.parse(raw)
  } catch { return { count: 0, first: Date.now() } }
}

function recordAttempt() {
  const d = getAttempts()
  const now = Date.now()
  if (now - d.first > LOGIN_WINDOW_MS) {
    sessionStorage.setItem(RL_KEY, JSON.stringify({ count: 1, first: now }))
    return 1
  }
  const count = d.count + 1
  sessionStorage.setItem(RL_KEY, JSON.stringify({ count, first: d.first }))
  return count
}

function clearAttempts() {
  sessionStorage.removeItem(RL_KEY)
}

function isRateLimited() {
  const d = getAttempts()
  if (Date.now() - d.first > LOGIN_WINDOW_MS) return false
  return d.count >= LOGIN_MAX
}

// ——— Login ————————————————————————————————————————————————
export async function login(email, password) {
  if (isRateLimited()) {
    throw new Error('Demasiados intentos. Espera 15 minutos antes de intentar de nuevo.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    recordAttempt()
    throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.')
  }

  clearAttempts()

  // Verificar que el usuario tiene perfil en empleadas
  const { data: empleada, error: empError } = await supabase
    .from('empleados')
    .select('id, nombre, apellido, activo, foto_url')
    .eq('auth_user_id', data.user.id)
    .single()

  if (empError || !empleada) {
    await supabase.auth.signOut()
    throw new Error('Cuenta no habilitada. Contacta a tu administradora.')
  }

  if (!empleada.activo) {
    await supabase.auth.signOut()
    throw new Error('Tu cuenta está desactivada. Contacta a tu administradora.')
  }

  return { user: data.user, empleada }
}

// ——— Logout ———————————————————————————————————————————————
export async function logout() {
  clearAttempts()
  sessionStorage.clear()
  localStorage.removeItem('staff_empleada')
  await supabase.auth.signOut()
  window.location.href = '/index.html'
}

// ——— Obtener sesión actual ————————————————————————————————
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// ——— Cargar perfil de empleada ————————————————————————————
export async function getEmpleadaProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('empleados')
    .select('id, nombre, apellido, email, telefono, descripcion, foto_url, especialidades, activo, color, created_at')
    .eq('auth_user_id', user.id)
    .single()

  if (error) return null
  return data
}

// ——— Guard: redirige al login si no hay sesión ————————————
export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    window.location.href = '/index.html'
    return null
  }
  return session
}

// ——— Guard: redirige al dashboard si ya hay sesión ————————
export async function redirectIfAuth() {
  const session = await getSession()
  if (session) {
    window.location.href = '/dashboard.html'
  }
}

// ——— Cambiar contraseña ————————————————————————————————————
export async function cambiarPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw new Error('No se pudo actualizar la contraseña. Intenta de nuevo.')
}
