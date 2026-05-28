# Oh Diosas — Staff App

Aplicacion mobile-first (PWA) para las empleadas del spa Oh Diosas. Cada empleada inicia sesion con su cuenta Supabase Auth y ve unicamente sus propias citas del dia. Comparte la base de datos con el sitio principal y el admin dashboard.

**Stack:** Node.js 24 · Express 4 (servidor estatico) · Supabase Auth · Vanilla JS ES Modules · PWA · Vercel

---

## Estructura del proyecto

```
staff-app/
├── api/
│   └── index.js              # Punto de entrada serverless (Vercel)
├── config/
│   └── supabase.js           # Cliente Supabase servidor (service role)
├── frontend/
│   ├── index.html            # Login con email + contrasena
│   ├── dashboard.html        # Inicio: resumen del dia y proxima cita
│   ├── citas.html            # Mis citas con filtros y 3 vistas
│   ├── cita-detalle.html     # Detalle de cita + cambio de estado
│   ├── perfil.html           # Ver y editar perfil personal
│   ├── manifest.json         # Configuracion PWA
│   ├── sw.js                 # Service Worker (soporte offline)
│   ├── css/
│   │   └── staff.css
│   ├── js/
│   │   ├── supabase-client.js  # Conexion Supabase (anon key, hardcoded)
│   │   ├── auth.js             # Login, logout, verificacion de sesion
│   │   └── utils.js            # Helpers, formatters, estados de citas
│   └── icons/                # Iconos PWA (192, 512, maskable)
├── database/
│   └── schema_staff.sql      # Columnas en empleados + politicas RLS
├── server.js                 # Express: sirve frontend/ como estatico
├── vercel.json               # Routing y headers de seguridad
└── package.json              # Node 24, "type": "module"
```

---

## Despliegue manual en Vercel

### Paso 1 — Base de datos (una sola vez)

Antes de desplegar, la base de datos debe tener las columnas y politicas correctas.

Abre **Supabase → SQL Editor** y ejecuta el archivo:

```
database/schema_staff.sql
```

Esto agrega a la tabla `empleados`:
- Columnas `apellido`, `descripcion`, `foto_url`, `auth_user_id`
- RLS en `empleados`, `citas`, `clientes`, `servicios`
- Politicas para que cada empleada solo vea sus propias citas

> Si el Admin Dashboard ya fue configurado antes, este SQL puede ya estar aplicado. Es seguro ejecutarlo de nuevo — usa `IF NOT EXISTS` donde corresponde.

---

### Paso 2 — Repositorio en GitHub

El repositorio ya existe: `JLCervantes-19/Spa-Staff-2026`

Para hacer push de cambios:

```bash
cd "/ruta/a/staff-app"
git add .
git commit -m "deploy: descripcion del cambio"
git push origin main
```

---

### Paso 3 — Importar el proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesion con tu cuenta `jhan-cervantes-projects`
2. Clic en **Add New Project**
3. Busca y selecciona el repositorio `JLCervantes-19/Spa-Staff-2026`
4. Configura los ajustes de construccion:

| Ajuste | Valor |
|--------|-------|
| **Framework Preset** | `Other` |
| **Root Directory** | `./` (dejar como esta) |
| **Build Command** | `npm install` |
| **Output Directory** | *(dejar vacio)* |
| **Install Command** | `npm install` |
| **Node.js Version** | `24.x` |

---

### Paso 4 — Configurar las variables de entorno

En la seccion **Environment Variables** del formulario de importacion, agrega las siguientes variables. Selecciona los entornos **Production**, **Preview** y **Development** para cada una.

#### Variables obligatorias (servidor)

| Variable | Descripcion | Valor |
|----------|-------------|-------|
| `SUPABASE_URL` | URL del proyecto Supabase | `https://whouejjrpjcvoueyajbu.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Clave de servicio (solo servidor) | Ver abajo |

#### Donde encontrar `SUPABASE_SERVICE_KEY`

1. Ve a [supabase.com](https://supabase.com) → proyecto `BD_Spa's_Startup`
2. Settings → API
3. Copia el valor de **service_role** (en "Project API keys")
4. **NUNCA** la pongas en el frontend ni en el repositorio

#### Nota sobre el frontend

El frontend (`frontend/js/supabase-client.js`) usa la **anon key** directamente en el codigo — esto es correcto y seguro por diseno. La anon key es publica y esta controlada por las politicas RLS de Supabase.

La `service_role key` solo la usa el servidor en `config/supabase.js` y nunca llega al navegador.

---

### Paso 5 — Hacer deploy

1. Clic en **Deploy**
2. Vercel instala dependencias y despliega
3. Al terminar obtienes una URL como `https://spa-staff-2026-xxxx.vercel.app`

---

### Paso 6 — Configurar URLs en Supabase Auth

Para que el login funcione correctamente en la URL de produccion:

1. Ve a [supabase.com](https://supabase.com) → proyecto `BD_Spa's_Startup`
2. Authentication → URL Configuration
3. Configura:

| Campo | Valor |
|-------|-------|
| **Site URL** | `https://spa-staff-2026.vercel.app` (o tu dominio personalizado) |
| **Redirect URLs** | `https://spa-staff-2026.vercel.app/**` |

> Si usas un dominio personalizado en Vercel, pon ese dominio aqui en lugar del generado.

---

### Paso 7 — Verificar que funciona

1. Abre la URL desplegada
2. Debes ver la pantalla de login
3. Inicia sesion con las credenciales de una empleada existente
4. Debes ver su dashboard con las citas del dia

Si el login falla:
- Verifica que el usuario existe en Supabase → Authentication → Users
- Verifica que `auth_user_id` esta vinculado en la tabla `empleados`
- Confirma que la URL esta en las Redirect URLs de Supabase Auth

---

### Paso 8 — Actualizar variables de entorno (si el proyecto ya existe)

1. Ve a [vercel.com](https://vercel.com) → proyecto `spa-staff-2026`
2. Settings → Environment Variables
3. Edita o agrega la variable
4. Ve a Deployments → **Redeploy** para que tome efecto

---

## Deploy via CLI (alternativa)

```bash
# Instalar CLI
npm install -g vercel

# Desde la carpeta del proyecto
cd "/ruta/a/staff-app"

# Vincular al proyecto existente
vercel link --scope jhan-cervantes-projects --project spa-staff-2026

# Agregar variables
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_KEY production

# Deploy a produccion
vercel --prod
```

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor Express (sirve frontend/ en localhost)
npm start
# → http://localhost:3000

# O servir el frontend directamente (sin Express)
npx serve frontend/ -p 5500
# → http://localhost:5500
```

Para que el login funcione en local, agrega `http://localhost:3000` (o el puerto que uses) a las **Redirect URLs** en Supabase Authentication → URL Configuration.

Crea un archivo `.env` para el servidor local:

```env
SUPABASE_URL=https://whouejjrpjcvoueyajbu.supabase.co
SUPABASE_SERVICE_KEY=tu_service_role_key_aqui
PORT=3000
```

---

## Crear empleadas con acceso

Las empleadas se crean desde el **Admin Dashboard** (`empleadas.html`). El dashboard pide nombre, apellido, telefono, email y contrasena inicial, luego crea automaticamente el usuario en Supabase Auth.

**Para crear manualmente** (si el dashboard no esta disponible):

1. Supabase → Authentication → Users → **Add user**
2. Ingresa email y contrasena temporal
3. Copia el UUID generado
4. En SQL Editor:

```sql
UPDATE empleados
SET auth_user_id = 'UUID-DEL-USUARIO-AUTH'
WHERE email = 'email@dela.empleada';
```

---

## Variables de entorno — resumen

| Variable | Obligatoria | Expuesta al cliente | Donde va |
|----------|-------------|---------------------|----------|
| `SUPABASE_URL` | Si | No | Solo servidor |
| `SUPABASE_SERVICE_KEY` | Si | **NUNCA** | Solo servidor |
| `SUPABASE_ANON` | N/A | Si (hardcoded) | frontend/js/supabase-client.js |

---

## Estados de citas

| Estado | Significado |
|--------|-------------|
| `pendiente` | Programada, sin accion aun |
| `realizada` | Servicio completado |
| `atrasada` | Hay retraso |
| `no_asistio` | El cliente no se presento |
| `cancelada` | Cita cancelada |

---

## Seguridad

- RLS activo: cada empleada solo ve y modifica sus propias citas
- `service_role key` nunca en el frontend — solo en servidor via `config/supabase.js`
- Rate limiting: max 10 intentos de login / 15 minutos por navegador
- Service Worker para soporte offline basico
- Headers de seguridad en `vercel.json`: CSP, X-Frame-Options, X-Content-Type-Options
