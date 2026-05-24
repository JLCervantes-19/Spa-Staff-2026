# Oh Diosas — Staff App

Aplicación mobile-first (PWA) para las empleadas del spa Oh Diosas. Cada empleada ve y gestiona únicamente sus propias citas del día. Comparte la base de datos Supabase con el sitio principal y el dashboard de administración.

---

## Estructura del proyecto

```
staff-app/
├── frontend/
│   ├── index.html           # Login con email + contraseña
│   ├── dashboard.html       # Inicio: resumen del día y próxima cita
│   ├── citas.html           # Mis citas con filtros y 3 vistas
│   ├── cita-detalle.html    # Detalle de cita + cambio de estado
│   ├── perfil.html          # Ver y editar perfil personal
│   ├── manifest.json        # Configuración PWA
│   ├── sw.js                # Service Worker (offline support)
│   ├── css/staff.css
│   ├── js/
│   │   ├── supabase-client.js  # Conexión Supabase (anon key)
│   │   ├── auth.js             # Login, logout, verificación de sesión
│   │   └── utils.js            # Helpers y formatters
│   └── icons/               # Iconos PWA
├── database/
│   └── schema_staff.sql     # Columnas adicionales en empleados + políticas RLS
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Requisitos previos

- Proyecto Supabase activo (compartido con SpaOhDiosas y admin-dashboard)
- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub
- El **Admin Dashboard** debe estar activo para crear empleadas

---

## Paso 1 — Configurar la base de datos (una sola vez)

Abre **Supabase → SQL Editor** y ejecuta:

```
database/schema_staff.sql
```

Esto agrega a la tabla `empleados`:
- Columnas `apellido`, `descripcion`, `foto_url`, `auth_user_id`
- RLS activo en `empleados`, `citas`, `clientes`, `servicios`
- Políticas para que cada empleada solo vea sus propios datos

> Si el Admin Dashboard ya fue configurado, es posible que este SQL ya esté aplicado. Puedes ejecutarlo de todas formas — usa `IF NOT EXISTS` donde corresponde.

---

## Paso 2 — Crear empleadas con acceso

Las empleadas se crean y gestionan desde el **Admin Dashboard** (`empleadas.html`).

Al crear una empleada, el dashboard pide:
- Nombre, apellido, teléfono, email
- Contraseña inicial (tú se la comunicas a la empleada)
- Servicios que puede realizar

El sistema crea automáticamente el usuario en Supabase Auth y vincula el `auth_user_id` a la empleada.

**Para crear manualmente** (si el dashboard no está disponible):

1. Ve a **Supabase → Authentication → Users → Add user**
2. Ingresa email y contraseña
3. Copia el UUID generado
4. En SQL Editor:
```sql
UPDATE empleados
SET auth_user_id = 'UUID-DEL-USUARIO-AUTH'
WHERE email = 'email@de.la.empleada';
```

---

## Paso 3 — Subir a GitHub

```bash
# Desde la carpeta staff-app/
git init
git add .
git commit -m "Staff App — Oh Diosas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ohdiosas-staff.git
git push -u origin main
```

---

## Paso 4 — Desplegar en Vercel

### Opción A — Importar desde GitHub (recomendado)

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Selecciona tu repositorio `ohdiosas-staff`
3. Configura los ajustes de construcción:

| Ajuste | Valor |
|--------|-------|
| **Framework Preset** | Other |
| **Root Directory** | `./` (raíz del repo) |
| **Build Command** | *(dejar vacío)* |
| **Output Directory** | *(dejar vacío — lo maneja vercel.json)* |
| **Install Command** | *(dejar vacío)* |

4. En **Environment Variables**, agrega:

| Variable | Valor | Dónde encontrarlo |
|----------|-------|-------------------|
| `SUPABASE_URL` | `https://whouejjrpjcvoueyajbu.supabase.co` | Supabase → Project Settings → API |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase → Project Settings → API → anon/public |

> **Nota:** La `anon key` es pública por diseño — puede ir en el frontend sin riesgo. La `service_role key` **NUNCA** va en este proyecto.

5. Haz clic en **Deploy**

### Opción B — Vercel CLI

```bash
npm install -g vercel
cd staff-app/
vercel

# Responder el asistente:
# Set up and deploy? Y
# Link to existing project? N
# Project name: ohdiosas-staff
# Which directory: ./
# Override settings? N

# Producción:
vercel --prod
```

---

## Paso 5 — Configurar URLs de Supabase Auth

Una vez desplegada, copia la URL de tu proyecto Vercel (ej: `https://ohdiosas-staff.vercel.app`) y agrégala en:

**Supabase → Authentication → URL Configuration:**
- **Site URL:** `https://ohdiosas-staff.vercel.app`
- **Redirect URLs:** agrega `https://ohdiosas-staff.vercel.app/**`

---

## Usuarios de prueba — Staff App

> Estos usuarios deben existir en Supabase Auth Y tener su `auth_user_id` vinculado en la tabla `empleados`.

| Empleada | Email | Contraseña | Notas |
|----------|-------|------------|-------|
| _(completar)_ | _(completar)_ | _(completar)_ | Empleada de prueba 1 |
| _(completar)_ | _(completar)_ | _(completar)_ | Empleada de prueba 2 |

**Para probar el login:**
1. Abre `https://ohdiosas-staff.vercel.app` (o `http://localhost:5500`)
2. Ingresa el email y contraseña de la empleada
3. Debes ver su dashboard con las citas del día

**Si el login falla:**
- Verifica que el usuario existe en Supabase Auth
- Verifica que `auth_user_id` está vinculado en la tabla `empleados`
- Revisa que la URL de la app esté en las Redirect URLs de Supabase

---

## Estados de citas

| Estado | Significado |
|--------|-------------|
| `pendiente` | Cita programada, sin acción aún |
| `realizada` | Servicio completado |
| `atrasada` | Cliente llegó tarde o hay retraso |
| `no_asistio` | El cliente no se presentó |
| `cancelada` | Cita cancelada |

---

## Desarrollo local

```bash
# Con npx serve (recomendado)
cd staff-app/
npx serve frontend/ -p 5500
# Abrir: http://localhost:5500

# Con VS Code Live Server
# Clic derecho en frontend/index.html → Open with Live Server
```

Agrega `http://localhost:5500` a las **Redirect URLs** en Supabase Auth para que el login funcione localmente.

---

## Seguridad

- RLS activo: cada empleada solo ve y modifica sus propias citas
- La `service_role key` **nunca** va en este proyecto
- Rate limiting: máx 10 intentos de login / 15 minutos por navegador
- PWA con service worker para soporte offline básico
- `.env` excluido del repositorio via `.gitignore`
