import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import imageRoutes from './routes/imageRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ──── CORS ────────────────────────────────────────────────
app.use(cors({ origin: '*' }));

// ──── Body parsers ────────────────────────────────────────
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ──── Static files ────────────────────────────────────────
// Serve uploaded images from the /uploads URL path
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// ──── Routes ──────────────────────────────────────────────
app.use('/api/images', imageRoutes);
app.use('/api/campaigns', campaignRoutes);

// ──── Health check ────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ──── Global error handler (must be last) ─────────────────
app.use(errorHandler);

export default app;
