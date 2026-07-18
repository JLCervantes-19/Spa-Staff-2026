# Graph Report - .  (2026-07-17)

## Corpus Check
- 8 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 101 nodes · 154 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 1% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.87)
- Token cost: 58,334 input · 19,444 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Autenticación y Rate Limiting|Autenticación y Rate Limiting]]
- [[_COMMUNITY_Restricción de Datos del Cliente (Least Privilege)|Restricción de Datos del Cliente (Least Privilege)]]
- [[_COMMUNITY_Utilidades Compartidas del Staff|Utilidades Compartidas del Staff]]
- [[_COMMUNITY_README — Descripción Histórica (desactualizada)|README — Descripción Histórica (desactualizada)]]
- [[_COMMUNITY_Servidor y Cliente Supabase|Servidor y Cliente Supabase]]
- [[_COMMUNITY_Identidad de Marca|Identidad de Marca]]
- [[_COMMUNITY_PWA, RLS y Seguridad|PWA, RLS y Seguridad]]
- [[_COMMUNITY_Caché del Service Worker|Caché del Service Worker]]
- [[_COMMUNITY_Discrepancia de ID del Workflow n8n|Discrepancia de ID del Workflow n8n]]

## God Nodes (most connected - your core abstractions)
1. `Oh Diosas — Staff App (README)` - 10 edges
2. `Auth Helpers (frontend/js/auth.js)` - 8 edges
3. `Dashboard Page (frontend/dashboard.html)` - 8 edges
4. `Citas Page (frontend/citas.html)` - 7 edges
5. `dashboard.html — portal de inicio de la empleada (resumen del día, próxima cita)` - 7 edges
6. `cita-detalle.html — Detalle de cita y cambio de estado` - 7 edges
7. `Supabase Browser Client (frontend/js/supabase-client.js)` - 6 edges
8. `Cita Detalle Page (frontend/cita-detalle.html)` - 6 edges
9. `citas.html — Mis citas (vistas lista, calendario y agenda/timeline)` - 6 edges
10. `requireAuth()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Supabase Browser Client (frontend/js/supabase-client.js)` --references--> `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)`  [EXTRACTED]
  frontend/js/supabase-client.js → CLAUDE.md
- `Staff DB Schema & RLS Policies (database/schema_staff.sql)` --conceptually_related_to--> `Staff App README`  [INFERRED]
  database/schema_staff.sql → README.md
- `Sección Seguridad del README (RLS por empleada, service_role key solo servidor, rate limiting login, Service Worker offline, headers CSP)` --semantically_similar_to--> `Principio de mínimo privilegio aplicado en cita-detalle.html: se eliminó el acceso de la empleada a teléfono, email y botón 'Contactar por WhatsApp' del cliente; solo ve nombre, servicio, hora y notas internas ('Si necesitas contactar al cliente, comunícate con administración')`  [INFERRED] [semantically similar]
  README.md → frontend/cita-detalle.html
- `Supabase Server Client (config/supabase.js)` --references--> `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)`  [EXTRACTED]
  config/supabase.js → CLAUDE.md
- `Service Worker PWA (frontend/sw.js)` --implements--> `PWA — Progressive Web App (mobile-first staff portal)`  [EXTRACTED]
  frontend/sw.js → README.md

## Hyperedges (group relationships)
- **Flujo de estandarización de estados de cita a través de las páginas del staff-app** — dashboard_html, citas_html, citadetalle_html [INFERRED 0.85]
- **Patrón de diseño de mínimo privilegio en cita-detalle.html** — citadetalle_html, citadetalle_modal_estado, citadetalle_least_privilege [INFERRED 0.85]
- **Módulos JS compartidos consumidos por las tres páginas del staff-app** — auth_js, supabase_client_js, utils_js_estados [INFERRED 0.75]

## Communities (9 total, 1 thin omitted)

### Community 0 - "Autenticación y Rate Limiting"
Cohesion: 0.19
Nodes (14): clearAttempts(), _clearWarning(), dismissWarningIfActive(), getAttempts(), getSession(), isRateLimited(), isSessionExpired(), login() (+6 more)

### Community 1 - "Restricción de Datos del Cliente (Least Privilege)"
Cohesion: 0.22
Nodes (18): auth.js — requireAuth, logout, getEmpleadaProfile (guard de sesión y perfil de la empleada), cita-detalle.html — Detalle de cita y cambio de estado, Principio de mínimo privilegio aplicado en cita-detalle.html: se eliminó el acceso de la empleada a teléfono, email y botón 'Contactar por WhatsApp' del cliente; solo ve nombre, servicio, hora y notas internas ('Si necesitas contactar al cliente, comunícate con administración'), Modal 'Cambiar estado' en cita-detalle.html: reducido a solo 2 opciones (Completada, No asistió); comentario explícito indica que las cancelaciones las gestiona admin o cliente, no el staff, Chips de filtro de estado en citas.html: Todos, Pendientes, Confirmadas, Completadas, No asistió, y chip agrupado 'Canceladas' (cancelada_cliente + cancelada_admin), citas.html — Mis citas (vistas lista, calendario y agenda/timeline), Tabla Supabase 'citas' (columnas: id, fecha, hora_inicio, hora_fin, estado, notas, empleado_id; relaciones a clientes y servicios) — compartida entre dashboard, citas y cita-detalle, Configuración Supabase en CLAUDE.md de staff-app (project_id whouejjrpjcvoueyajbu) (+10 more)

### Community 2 - "Utilidades Compartidas del Staff"
Cohesion: 0.19
Nodes (9): avatarHTML(), avatarInitialesHTML(), ESTADOS, hoyBogota(), iniciales(), isThisMonth(), isThisWeek(), isToday() (+1 more)

### Community 3 - "README — Descripción Histórica (desactualizada)"
Cohesion: 0.32
Nodes (13): Auth Guard Pattern — requireAuth / redirectIfAuth protegen rutas, Estados de Cita — pendiente, realizada, atrasada, no_asistio, cancelada, Supabase Realtime — suscripción postgres_changes en citas, Tres vistas de citas — Lista, Calendario, Agenda/Timeline, WhatsApp Contact Link — empleada puede contactar cliente desde cita-detalle, Auth Helpers (frontend/js/auth.js), Supabase Browser Client (frontend/js/supabase-client.js), Shared Utilities (frontend/js/utils.js) (+5 more)

### Community 4 - "Servidor y Cliente Supabase"
Cohesion: 0.15
Nodes (9): API Entry Point (api/index.js), Service Role Key — solo en servidor (config/supabase.js), nunca en frontend, Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup), Vercel Deployment — jhan-cervantes-projects/spa-staff-2026, Supabase Server Client (config/supabase.js), Staff App CLAUDE.md Config, app, __dirname (+1 more)

### Community 5 - "Identidad de Marca"
Cohesion: 0.31
Nodes (11): Brand Color: Forest Green (#2D4A2D approx.), Brand Color: Off-White / Cream Background (#F5F3EE approx.), Brand Color: Warm Gold / Sandy Tan (#C9A96E approx.), Spa Oh Diosas Brand Identity, PWA Icon 192x192, PWA Icon 512x512, Icon Layout: Two-Tone Horizontal Split (Green upper / Gold lower), PWA Maskable Icon 192x192 (+3 more)

### Community 6 - "PWA, RLS y Seguridad"
Cohesion: 0.33
Nodes (7): PWA — Progressive Web App (mobile-first staff portal), Client-side Rate Limiting — máx 10 intentos de login / 15 min, Row Level Security — cada empleada solo ve sus propios datos, Service Worker Cache Strategy — CSS cache-first, HTML/Supabase network-first, Staff DB Schema & RLS Policies (database/schema_staff.sql), Staff App README, Service Worker PWA (frontend/sw.js)

### Community 7 - "Caché del Service Worker"
Cohesion: 0.5
Nodes (3): clone, STATIC_ASSETS, url

## Ambiguous Edges - Review These
- `Tabla de estados de citas en README (5 estados: pendiente, realizada, atrasada, no_asistio, cancelada)` → `Estandarización de estados de cita a 6 valores (pendiente, confirmada, completada, no_asistio, cancelada_cliente, cancelada_admin), reemplazando un sistema anterior de 8 estados (incluía en_proceso, realizada, atrasada, cancelada, reagendada)`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **19 isolated node(s):** `__filename`, `__dirname`, `app`, `STATIC_ASSETS`, `url` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Tabla de estados de citas en README (5 estados: pendiente, realizada, atrasada, no_asistio, cancelada)` and `Estandarización de estados de cita a 6 valores (pendiente, confirmada, completada, no_asistio, cancelada_cliente, cancelada_admin), reemplazando un sistema anterior de 8 estados (incluía en_proceso, realizada, atrasada, cancelada, reagendada)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)` connect `Servidor y Cliente Supabase` to `README — Descripción Histórica (desactualizada)`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Supabase Browser Client (frontend/js/supabase-client.js)` connect `README — Descripción Histórica (desactualizada)` to `Servidor y Cliente Supabase`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `app` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._