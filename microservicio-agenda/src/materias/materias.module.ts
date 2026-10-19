import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { Materia } from './entities/materia.entity';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Materia, Actividad, Sesion])],
  controllers: [MateriasController],
  providers: [MateriasService],
})
export class MateriasModule {}