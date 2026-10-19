import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { sign, verify } from 'jsonwebtoken';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 8080;
const TARGET = process.env.MICROSERVICIO_URL ?? 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secreto-de-desarrollo';
const USUARIO = process.env.AUTH_USER ?? 'admin';
const CLAVE = process.env.AUTH_PASSWORD ?? 'admin123';

async function bootstrap() {
  // bodyParser desactivado: si el gateway leyera el cuerpo, el proxy no podría reenviarlo
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const server = app.getHttpAdapter().getInstance();

  // 1) CORS
  server.use(cors());

  // 2) Logging centralizado de peticiones
  server.use((req: Request, res: Response, next: NextFunction) => {
    const inicio = Date.now();
    res.on('finish', () => {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - inicio} ms)`,
      );
    });
    next();
  });

  // 3) Rate limiting
  server.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { statusCode: 429, message: 'Demasiadas peticiones, intenta más tarde' },
    }),
  );

  // Endpoint de salud (lo usaremos en el healthcheck de Docker)
  server.get('/health', (_req: Request, res: Response) => {
    res.json({ estado: 'ok' });
  });

  // Login: entrega un JWT (usuario de prueba definido por variables de entorno)
  server.post('/auth/login', express.json(), (req: Request, res: Response) => {
    const { usuario, clave } = req.body ?? {};
    if (usuario !== USUARIO || clave !== CLAVE) {
      return res.status(401).json({ statusCode: 401, message: 'Credenciales inválidas' });
    }
    const token = sign({ sub: usuario }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ access_token: token });
  });

  // 4) Validación de JWT para todo lo que pase por /api
  server.use('/api', (req: Request, res: Response, next: NextFunction) => {
    const cabecera = req.headers.authorization ?? '';
    const [tipo, token] = cabecera.split(' ');
    if (tipo !== 'Bearer' || !token) {
      return res.status(401).json({ statusCode: 401, message: 'Token requerido' });
    }
    try {
      verify(token, JWT_SECRET);
      return next();
    } catch {
      return res.status(401).json({ statusCode: 401, message: 'Token inválido o vencido' });
    }
  });

  // Proxy inverso: /api/materias -> http://microservicio/materias
  server.use(
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: true,
      pathFilter: '/api',
      pathRewrite: { '^/api': '' },
    }),
  );

  await app.listen(PORT);
  console.log(`Gateway escuchando en el puerto ${PORT}, reenviando a ${TARGET}`);
}
bootstrap();