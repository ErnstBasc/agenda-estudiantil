# Agenda Estudiantil

Sistema para que un estudiante administre sus materias, actividades y horas de
estudio. Arquitectura de microservicios con un API Gateway (proxy inverso), un
microservicio backend en NestJS y una base de datos PostgreSQL, todo
orquestado con Docker Compose.

## Arquitectura

- **Gateway** (NestJS/Express, puerto 8080): único punto de entrada. Aplica CORS,
  logging de peticiones, rate limiting y validación de JWT, y reenvía `/api/*`
  al microservicio.
- **Microservicio** (NestJS + TypeORM, red interna): CRUD de materias,
  actividades y sesiones de estudio, con validación mediante DTOs.
- **Base de datos** (PostgreSQL 16): persistencia de las tres entidades.

## Requisitos

- Docker Desktop (con Docker Compose)
- Git

## Cómo ejecutar

```bash
git clone https://github.com/ErnstBasc/agenda-estudiantil.git
cd agenda-estudiantil
docker compose up --build
```

Espera a que los tres servicios estén en estado `healthy`:

```bash
docker compose ps
```

El sistema queda disponible en `http://localhost:8080`.
Para detenerlo: `docker compose down` (añade `-v` para borrar los datos).

## Credenciales de prueba

Usuario `admin`, clave `admin123` (definidas en `docker-compose.yml`).

## Cómo probar (cURL)

En Windows, usa Command Prompt (`cmd`). En Linux/macOS cambia `%TOKEN%` por `$TOKEN`.

```bash
# 1. Salud del gateway
curl http://localhost:8080/health

# 2. Sin token: responde 401
curl -i http://localhost:8080/api/materias

# 3. Login: devuelve un access_token
curl -X POST http://localhost:8080/auth/login -H "Content-Type: application/json" -d "{\"usuario\":\"admin\",\"clave\":\"admin123\"}"

# 4. Guarda el token (Windows cmd)
set TOKEN=pega_aqui_el_token

# 5. Crear una materia
curl -i -X POST http://localhost:8080/api/materias -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" -d "{\"nombre\":\"Ingenieria de Datos\",\"docente\":\"Ing. Perez\",\"metaHorasSemanales\":6}"

# 6. Listar materias
curl http://localhost:8080/api/materias -H "Authorization: Bearer %TOKEN%"

# 7. Crear una actividad
curl -i -X POST http://localhost:8080/api/actividades -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" -d "{\"titulo\":\"Informe 1\",\"fechaEntrega\":\"2026-10-25\",\"materiaId\":1}"

# 8. Crear una sesión de estudio
curl -i -X POST http://localhost:8080/api/sesiones -H "Authorization: Bearer %TOKEN%" -H "Content-Type: application/json" -d "{\"inicio\":\"2026-10-19T14:00:00Z\",\"fin\":\"2026-10-19T16:30:00Z\",\"materiaId\":1,\"actividadId\":1}"

# 9. Resumen semanal de la materia
curl http://localhost:8080/api/materias/1/resumen -H "Authorization: Bearer %TOKEN%"
```

## Endpoints

Todos van bajo `/api` y requieren `Authorization: Bearer <token>`.

| Recurso | Métodos |
|---|---|
| `/api/materias` | `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`, `GET /:id/resumen` |
| `/api/actividades` | `POST`, `GET` (filtro `?materiaId=`), `GET /:id`, `PATCH /:id`, `DELETE /:id` |
| `/api/sesiones` | `POST`, `GET` (filtro `?materiaId=`), `GET /:id`, `PATCH /:id`, `DELETE /:id` |
| `/auth/login` | `POST` (público) |
| `/health` | `GET` (público) |

## Reglas de negocio

- El fin de una sesión debe ser posterior a su inicio (400 en caso contrario).
- Una sesión solo puede asociarse a una actividad de su misma materia.
- Una materia con actividades o sesiones no puede eliminarse (409).
- `GET /api/materias/:id/resumen` compara las horas estudiadas esta semana con la meta semanal.

## Estructura

```
agenda-estudiantil/
├── gateway/                # API Gateway
├── microservicio-agenda/   # Microservicio backend
├── docker-compose.yml
└── README.md
```

## Flujo de ramas (Git Flow)

`main` (estable), `develop` (integración) y `feature/*` (cada funcionalidad).