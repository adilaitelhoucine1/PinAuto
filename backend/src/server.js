import 'dotenv/config';
import app from './app.js';
import { initializeDatabase } from './config/db.js';

const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;

async function start() {
  try {
    await initializeDatabase();
    console.log('[Server] Database ready.');

    app.listen(PORT, () => {
      console.log(`[Server] Pinterest Upload Manager backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
  }
}

start();
