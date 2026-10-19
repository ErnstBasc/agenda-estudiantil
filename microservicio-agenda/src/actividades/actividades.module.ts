import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from '../materias/entities/materia.entity';
import { ActividadesController } from './actividades.controller';
import { ActividadesService } from './actividades.service';
import { Actividad } from './entities/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad, Materia])],
  controllers: [ActividadesController],
  providers: [ActividadesService],
})
export class ActividadesModule {}