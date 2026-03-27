require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/db');

// Routers
const userRouter = require('./routers/userRouter');
const commentRouter = require('./routers/commentsRouter');
const postRouter = require('./routers/postsRouter');

const app = express();

// Middleware
app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);

// 404 Handler
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server Function
const startServer = async () => {
    try {
        await connectDB();
        app.listen(config.PORT, () => {
            console.log(`🚀 Server is running on port ${config.PORT}`);
        });
    } catch (err) {
        console.error("🔥 Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();
