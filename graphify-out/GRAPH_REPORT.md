# Graph Report - /Users/macuser/Desktop/LANDING PROYECTS/Spa_OhDiosas/SISTEMA WEB/staff-app  (2026-05-27)

## Corpus Check
- Corpus is ~9,245 words - fits in a single context window. You may not need a graph.

## Summary
- 76 nodes · 104 edges · 7 communities
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Auth Frontend|Auth Frontend]]
- [[_COMMUNITY_Utils y Formatters|Utils y Formatters]]
- [[_COMMUNITY_Serverless + Supabase Config|Serverless + Supabase Config]]
- [[_COMMUNITY_Conceptos RLS + Realtime|Conceptos RLS + Realtime]]
- [[_COMMUNITY_Brand Identity|Brand Identity]]
- [[_COMMUNITY_PWA + RLS + Seguridad|PWA + RLS + Seguridad]]
- [[_COMMUNITY_Service Worker Cache|Service Worker Cache]]

## God Nodes (most connected - your core abstractions)
1. `Auth Helpers (frontend/js/auth.js)` - 8 edges
2. `Dashboard Page (frontend/dashboard.html)` - 8 edges
3. `Citas Page (frontend/citas.html)` - 7 edges
4. `Supabase Browser Client (frontend/js/supabase-client.js)` - 6 edges
5. `Cita Detalle Page (frontend/cita-detalle.html)` - 6 edges
6. `Shared Utilities (frontend/js/utils.js)` - 5 edges
7. `Staff App PWA Icon Design System` - 5 edges
8. `login()` - 4 edges
9. `Perfil Page (frontend/perfil.html)` - 4 edges
10. `Staff App README` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Supabase Browser Client (frontend/js/supabase-client.js)` --references--> `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)`  [EXTRACTED]
  frontend/js/supabase-client.js → CLAUDE.md
- `Staff DB Schema & RLS Policies (database/schema_staff.sql)` --conceptually_related_to--> `Staff App README`  [INFERRED]
  database/schema_staff.sql → README.md
- `Supabase Server Client (config/supabase.js)` --references--> `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)`  [EXTRACTED]
  config/supabase.js → CLAUDE.md
- `Service Worker PWA (frontend/sw.js)` --implements--> `PWA — Progressive Web App (mobile-first staff portal)`  [EXTRACTED]
  frontend/sw.js → README.md
- `Staff App README` --references--> `Row Level Security — cada empleada solo ve sus propios datos`  [EXTRACTED]
  README.md → database/schema_staff.sql

## Hyperedges (group relationships)
- **Frontend JS Module Trio (supabase-client, auth, utils)** — frontend_supabase_client, frontend_auth, frontend_utils [EXTRACTED 0.95]
- **Protected Pages requiring Auth Guard** — page_dashboard, page_citas, page_cita_detalle, page_perfil [EXTRACTED 1.00]
- **Supabase Tables with Staff RLS Policies** — db_schema, concept_rls, frontend_supabase_client [EXTRACTED 0.95]
- **PWA Infrastructure (SW + manifest + mobile-first pages)** — frontend_sw, page_index, page_dashboard, page_citas, page_perfil [INFERRED 0.85]
- **Server-side Supabase Service Role Stack** — api_index, server_js, config_supabase [EXTRACTED 1.00]
- **Staff App PWA Brand Icons Set** — icon_192, icon_512, icon_maskable_192, icon_maskable_512 [EXTRACTED 1.00]
- **Spa Oh Diosas Brand Color Palette (Green + Gold + Off-White)** — brand_color_forest_green, brand_color_warm_gold, brand_color_off_white [EXTRACTED 0.95]
- **192px Standard vs Maskable Icon Pair** — icon_192, icon_maskable_192, icon_layout_two_tone_split, maskable_icon_design [INFERRED 0.95]
- **512px Standard vs Maskable Icon Pair** — icon_512, icon_maskable_512, icon_layout_two_tone_split, maskable_icon_design [INFERRED 0.95]

## Communities (7 total, 0 thin omitted)

### Community 0 - "Auth Frontend"
Cohesion: 0.24
Nodes (10): clearAttempts(), getAttempts(), getSession(), isRateLimited(), login(), logout(), recordAttempt(), redirectIfAuth() (+2 more)

### Community 1 - "Utils y Formatters"
Cohesion: 0.16
Nodes (4): avatarHTML(), avatarInitialesHTML(), ESTADOS, iniciales()

### Community 2 - "Serverless + Supabase Config"
Cohesion: 0.15
Nodes (9): API Entry Point (api/index.js), Service Role Key — solo en servidor (config/supabase.js), nunca en frontend, Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup), Vercel Deployment — jhan-cervantes-projects/spa-staff-2026, Supabase Server Client (config/supabase.js), Staff App CLAUDE.md Config, app, __dirname (+1 more)

### Community 3 - "Conceptos RLS + Realtime"
Cohesion: 0.32
Nodes (13): Auth Guard Pattern — requireAuth / redirectIfAuth protegen rutas, Estados de Cita — pendiente, realizada, atrasada, no_asistio, cancelada, Supabase Realtime — suscripción postgres_changes en citas, Tres vistas de citas — Lista, Calendario, Agenda/Timeline, WhatsApp Contact Link — empleada puede contactar cliente desde cita-detalle, Auth Helpers (frontend/js/auth.js), Supabase Browser Client (frontend/js/supabase-client.js), Shared Utilities (frontend/js/utils.js) (+5 more)

### Community 4 - "Brand Identity"
Cohesion: 0.31
Nodes (11): Brand Color: Forest Green (#2D4A2D approx.), Brand Color: Off-White / Cream Background (#F5F3EE approx.), Brand Color: Warm Gold / Sandy Tan (#C9A96E approx.), Spa Oh Diosas Brand Identity, PWA Icon 192x192, PWA Icon 512x512, Icon Layout: Two-Tone Horizontal Split (Green upper / Gold lower), PWA Maskable Icon 192x192 (+3 more)

### Community 5 - "PWA + RLS + Seguridad"
Cohesion: 0.33
Nodes (7): PWA — Progressive Web App (mobile-first staff portal), Client-side Rate Limiting — máx 10 intentos de login / 15 min, Row Level Security — cada empleada solo ve sus propios datos, Service Worker Cache Strategy — CSS cache-first, HTML/Supabase network-first, Staff DB Schema & RLS Policies (database/schema_staff.sql), Staff App README, Service Worker PWA (frontend/sw.js)

### Community 6 - "Service Worker Cache"
Cohesion: 0.5
Nodes (3): clone, STATIC_ASSETS, url

## Knowledge Gaps
- **15 isolated node(s):** `__filename`, `__dirname`, `app`, `STATIC_ASSETS`, `url` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Supabase Project — whouejjrpjcvoueyajbu (BD_Spa's_Startup)` connect `Serverless + Supabase Config` to `Conceptos RLS + Realtime`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `Supabase Browser Client (frontend/js/supabase-client.js)` connect `Conceptos RLS + Realtime` to `Serverless + Supabase Config`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `app` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._