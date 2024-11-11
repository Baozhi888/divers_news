import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v4 as uuidv4 } from 'uuid';
import { initializeDatabase } from './config/database.js';
import { limiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import driverRoutes from './routes/driverRoutes.js';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(compression());

// Request ID and logging
app.use((req, res, next) => {
  req.id = uuidv4();
  logger.info({
    requestId: req.id,
    method: req.method,
    path: req.path
  });
  next();
});

app.use(express.json());
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});
