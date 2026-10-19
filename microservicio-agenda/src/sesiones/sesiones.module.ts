import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Materia } from '../materias/entities/materia.entity';
import { Sesion } from './entities/sesion.entity';
import { SesionesController } from './sesiones.controller';
import { SesionesService } from './sesiones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion, Materia, Actividad])],
  controllers: [SesionesController],
  providers: [SesionesService],
})
export class SesionesModule {}