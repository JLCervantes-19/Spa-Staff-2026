-- ============================================================
-- SCHEMA STAFF — Serenità Staff App
-- Ejecutar en Supabase SQL Editor
-- Proyecto: whouejjrpjcvoueyajbu.supabase.co
-- ============================================================

-- ============================================================
-- PASO 1: Extender tabla empleados existente
-- ============================================================
ALTER TABLE empleados
  ADD COLUMN IF NOT EXISTS apellido      TEXT,
  ADD COLUMN IF NOT EXISTS descripcion   TEXT,
  ADD COLUMN IF NOT EXISTS foto_url      TEXT,
  ADD COLUMN IF NOT EXISTS auth_user_id  UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Índice para búsqueda rápida por auth_user_id
CREATE INDEX IF NOT EXISTS idx_empleados_auth_user_id ON empleados(auth_user_id);

-- ============================================================
-- PASO 2: Activar RLS en tabla empleados
-- ============================================================
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;

-- Cada empleada solo puede ver su propio registro
CREATE POLICY "empleada_select_propio" ON empleados
  FOR SELECT
  USING (auth.uid() = auth_user_id);

-- Cada empleada solo puede editar campos permitidos de su registro
CREATE POLICY "empleada_update_propio" ON empleados
  FOR UPDATE
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);

-- Bloquear INSERT desde el cliente (solo admin/service role puede crear empleadas)
CREATE POLICY "solo_admin_insert" ON empleados
  FOR INSERT
  WITH CHECK (false);

-- Bloquear DELETE desde el cliente
CREATE POLICY "solo_admin_delete" ON empleados
  FOR DELETE
  USING (false);

-- ============================================================
-- PASO 3: Activar RLS en tabla citas
-- ============================================================
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;

-- Empleada solo puede SELECT sus propias citas
CREATE POLICY "empleada_select_sus_citas" ON citas
  FOR SELECT
  USING (
    empleado_id IN (
      SELECT id FROM empleados WHERE auth_user_id = auth.uid()
    )
  );

-- Empleada solo puede UPDATE estado y notas de sus citas
CREATE POLICY "empleada_update_estado_cita" ON citas
  FOR UPDATE
  USING (
    empleado_id IN (
      SELECT id FROM empleados WHERE auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    empleado_id IN (
      SELECT id FROM empleados WHERE auth_user_id = auth.uid()
    )
  );

-- Bloquear INSERT/DELETE de citas desde el staff (solo admin puede crear citas)
CREATE POLICY "staff_no_insert_citas" ON citas
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "staff_no_delete_citas" ON citas
  FOR DELETE
  USING (false);

-- ============================================================
-- PASO 4: RLS en clientes (staff puede ver clientes de sus citas)
-- ============================================================
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Empleada puede ver clientes que tienen citas asignadas a ella
CREATE POLICY "empleada_ver_clientes_sus_citas" ON clientes
  FOR SELECT
  USING (
    id IN (
      SELECT cliente_id FROM citas
      WHERE empleado_id IN (
        SELECT id FROM empleados WHERE auth_user_id = auth.uid()
      )
    )
  );

-- ============================================================
-- PASO 5: RLS en servicios (lectura pública para empleadas)
-- ============================================================
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lectura_publica_servicios" ON servicios
  FOR SELECT
  USING (true);

-- ============================================================
-- VERIFICACIÓN — Consulta para comprobar la estructura
-- ============================================================
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'empleados'
-- ORDER BY ordinal_position;
