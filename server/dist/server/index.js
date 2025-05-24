"use strict";
// פלטפורמת התאמת תוכניות אקדמיות - Academic Program Matching Platform
// Main Server Entry Point
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Initialize Prisma client
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'פלטפורמת התאמת תוכניות אקדמיות - Academic Program Matching Platform',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// API Routes
app.get('/api/v1', (req, res) => {
    res.json({
        message: 'ברוך הבא לפלטפורמת התאמת התוכניות האקדמיות',
        messageEn: 'Welcome to Academic Program Matching Platform API',
        version: '1.0.0',
        endpoints: {
            institutions: '/api/v1/institutions',
            programs: '/api/v1/programs',
            users: '/api/v1/users',
            matching: '/api/v1/matching'
        }
    });
});
// Import route modules (will be created)
// import institutionRoutes from './routes/institutions';
// import programRoutes from './routes/programs';
// import userRoutes from './routes/users';
// import matchingRoutes from './routes/matching';
// Use route modules
// app.use('/api/v1/institutions', institutionRoutes);
// app.use('/api/v1/programs', programRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/matching', matchingRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'שגיאה פנימית בשרת',
        errorEn: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
});
// Database connection and server startup
async function startServer() {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Connected to PostgreSQL database');
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api/v1`);
        });
    }
    catch (error) {
        console.error('❌ Failed to connect to database:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
// Start the server
startServer().catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=index.js.map