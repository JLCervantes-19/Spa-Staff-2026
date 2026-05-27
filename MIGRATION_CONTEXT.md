# MIGRATION_CONTEXT — Staff App (App del Personal)

## Lógicas identificadas
- Login/logout via Supabase Auth (email + password)
- Verificación de empleada activa en tabla `empleados` (campo `auth_user_id`)
- Rate limiting del login en cliente (máx 10 intentos en 15min via sessionStorage)
- Guards de ruta: `requireAuth()` redirige a login, `redirectIfAuth()` redirige a dashboard
- Vista de citas del día con estado y detalle
- Vista de perfil de empleada
- Service Worker + manifest.json (PWA)

## Rutas API actuales
- **No hay rutas Express** — todas las operaciones se hacen directamente contra Supabase desde el frontend
- El frontend usa Supabase Auth + queries directas a las tablas con la anon key

## Variables de entorno requeridas
- `SUPABASE_URL` — URL del proyecto (actualmente hardcodeado en supabase-client.js)
- `SUPABASE_ANON_KEY` — anon key (actualmente hardcodeado en supabase-client.js)
- `SUPABASE_SERVICE_KEY` — service role key (en .env actual, no se usa en frontend)
- `APP_URL` — URL de la app

## Conexiones externas
- **Supabase Auth**: `signInWithPassword`, `signOut`, `getSession`, `getUser`, `updateUser`
- **Supabase DB** (anon key + RLS): tablas `empleados`, `citas`, `servicios`
- **Sin N8N, sin Evolution API**

## Stack actual → Stack objetivo
- **Antes**: Puro estático — sin backend, sin package.json, sin Node.js
- **Después**: Express + ES Modules + Vercel serverless (infraestructura base)
- **Frontend**: Sin cambios — sigue llamando a Supabase directamente con anon key
- **Nuevos archivos**: `package.json`, `server.js`, `api/index.js`, `config/supabase.js`
- **vercel.json**: reemplaza el build `@vercel/static` por arquitectura Express

## Diseño a preservar
- Paleta: tema oscuro con tonos púrpura/violeta, fondo `#0f0f14` o similar
- Tipografía: Cormorant Garamond (serif) + Inter
- CSS en `frontend/css/staff.css`
- PWA: `manifest.json` + `sw.js` en `frontend/`

## Notas de ambigüedad
1. Las credenciales de Supabase están hardcodeadas en `frontend/js/supabase-client.js`. Esto es correcto para la anon key (es una clave pública). El nuevo backend usa la service role key desde process.env, que NO se expone al frontend.
2. Al agregar Express, el `server.js` sirve `frontend/` como estáticos y tiene fallback SPA. Sin embargo, en Vercel con `rewrites`, los archivos estáticos deben estar en `public/`. Para mantener la estructura actual, se usa el formato `routes` en vercel.json.
3. No hay rutas API que migrar — el backend Express solo sirve archivos estáticos en desarrollo local.
