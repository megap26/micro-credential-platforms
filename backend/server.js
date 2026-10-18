import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './scripts/seed.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import curriculumRoutes from './routes/curriculumRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import credentialRoutes from './routes/credentialRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for frontend dev server
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly fallback
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check & Root Info Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Micro Credential Platform API',
    version: '1.0.0',
    mode: process.env.NODE_ENV || 'development',
    database: process.env.MONGODB_URI ? 'MongoDB Atlas / Local URI Configured' : 'Resilient In-Memory High-Performance Datastore',
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/curricula', curriculumRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/admin', adminRoutes);

// Fallback 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Initialize DB and launch server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Micro Credential Platform Backend Server Running on Port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🛡️ Auth & Verification Endpoints Ready`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('Fatal server startup error:', err);
    process.exit(1);
  }
};

startServer();
