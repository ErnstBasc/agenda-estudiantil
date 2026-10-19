"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT ?? 8080;
const TARGET = process.env.MICROSERVICIO_URL ?? 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secreto-de-desarrollo';
const USUARIO = process.env.AUTH_USER ?? 'admin';
const CLAVE = process.env.AUTH_PASSWORD ?? 'admin123';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    const server = app.getHttpAdapter().getInstance();
    server.use((0, cors_1.default)());
    server.use((req, res, next) => {
        const inicio = Date.now();
        res.on('finish', () => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - inicio} ms)`);
        });
        next();
    });
    server.use((0, express_rate_limit_1.rateLimit)({
        windowMs: 60 * 1000,
        limit: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { statusCode: 429, message: 'Demasiadas peticiones, intenta más tarde' },
    }));
    server.get('/health', (_req, res) => {
        res.json({ estado: 'ok' });
    });
    server.post('/auth/login', express_1.default.json(), (req, res) => {
        const { usuario, clave } = req.body ?? {};
        if (usuario !== USUARIO || clave !== CLAVE) {
            return res.status(401).json({ statusCode: 401, message: 'Credenciales inválidas' });
        }
        const token = (0, jsonwebtoken_1.sign)({ sub: usuario }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ access_token: token });
    });
    server.use('/api', (req, res, next) => {
        const cabecera = req.headers.authorization ?? '';
        const [tipo, token] = cabecera.split(' ');
        if (tipo !== 'Bearer' || !token) {
            return res.status(401).json({ statusCode: 401, message: 'Token requerido' });
        }
        try {
            (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
            return next();
        }
        catch {
            return res.status(401).json({ statusCode: 401, message: 'Token inválido o vencido' });
        }
    });
    server.use((0, http_proxy_middleware_1.createProxyMiddleware)({
        target: TARGET,
        changeOrigin: true,
        pathFilter: '/api',
        pathRewrite: { '^/api': '' },
    }));
    await app.listen(PORT);
    console.log(`Gateway escuchando en el puerto ${PORT}, reenviando a ${TARGET}`);
}
bootstrap();
//# sourceMappingURL=main.js.map