import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((_, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    next();
  });
}

app.use(express.static(join(__dirname, 'frontend')));

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', app: 'staff-app', timestamp: new Date().toISOString() });
});

// SPA fallback — todas las rutas sirven la SPA del staff
app.get('*', (_, res) => {
  res.sendFile(join(__dirname, 'frontend', 'index.html'));
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Staff App corriendo en http://localhost:${PORT}`);
  });
}
