import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from "path";
import fs from "fs";

import {
  fileURLToPath,
} from "url";

import connectDB from './config/db.js';


import { errorHandler } from './middleware/errorHandler.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import storyRoutes from "./routes/storyRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";


import homeRoutes from "./routes/homeRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import storyPdfUploadRoutes from "./routes/storyPdfUploadRoutes.js";


import publicationRoutes from "./routes/publicationRoutes.js";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const uploadsDirectory =
  path.join(
    __dirname,
    "uploads"
  );

const storiesUploadDirectory =
  path.join(
    uploadsDirectory,
    "stories"
  );

  if (
  !fs.existsSync(
    uploadsDirectory
  )
) {
  fs.mkdirSync(
    uploadsDirectory,
    {
      recursive: true,
    }
  );
}

if (
  !fs.existsSync(
    storiesUploadDirectory
  )
) {
  fs.mkdirSync(
    storiesUploadDirectory,
    {
      recursive: true,
    }
  );
}


// Create Express app
const app = express();
// Connect to database
connectDB();

// Middleware
app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// CORS configuration
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );


// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "http://172.30.0.144:3000",
//     process.env.FRONTEND_URL 
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

const corsOptions = {
  origin: "http://localhost:3000"|| process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Import Routes
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ebookRoutes from './routes/ebookRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
// app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ebooks', ebookRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/admin-auth', adminAuthRoutes);


app.use(
  "/api/uploads",
  uploadRoutes
);
app.use(
  "/api/media",
  mediaRoutes
);

app.use("/api/publications", publicationRoutes);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
  "/uploads",
  express.static(
    uploadsDirectory
  )
);
app.use(
  "/api/uploads",
  storyPdfUploadRoutes
);


app.use(
  "/api/content",
  contentRoutes
);

app.use(
  "/api/articles",
  articleRoutes
);

app.use("/api/stories", storyRoutes);
app.use("/api/poems", poemRoutes);

app.use("/api/home", homeRoutes);

app.use("/api/testimonials", testimonialRoutes);

app.use(
  "/api/donations",
  donationRoutes
);

// API documentation
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Prosper Foundation API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      blogs: '/api/blogs',
      bookings: '/api/bookings',
      articles: '/api/articles',
      contacts: '/api/contacts',
      comments: '/api/comments',
      content: "/api/content",
      users: '/api/users',
      ebooks: '/api/ebooks',
      publications: '/api/publications',
      purchases: '/api/purchases',
      storyPdfUpload:
          "/api/uploads/story-pdf",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🌟 Prosper Foundation Backend 🌟    ║
╠════════════════════════════════════════╣
║  Server is running on Port: ${PORT}    ║
║  Environment: ${NODE_ENV}              ║
║  API URL: http://localhost:${PORT}/api ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;