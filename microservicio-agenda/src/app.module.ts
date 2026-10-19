import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasModule } from './materias/materias.module';
import { ActividadesModule } from './actividades/actividades.module';
import { SesionesModule } from './sesiones/sesiones.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5433', 10),
      username: process.env.DB_USER ?? 'agenda',
      password: process.env.DB_PASSWORD ?? 'agenda123',
      database: process.env.DB_NAME ?? 'agenda_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MateriasModule,
    ActividadesModule,
    SesionesModule,
  ],
})
export class AppModule {}