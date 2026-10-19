import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly repo: Repository<Materia>,
    @InjectRepository(Actividad)
    private readonly actividadesRepo: Repository<Actividad>,
    @InjectRepository(Sesion)
    private readonly sesionesRepo: Repository<Sesion>,
  ) {}

  create(dto: CreateMateriaDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const materia = await this.repo.findOneBy({ id });
    if (!materia) {
      throw new NotFoundException(`Materia ${id} no encontrada`);
    }
    return materia;
  }

  async update(id: number, dto: UpdateMateriaDto) {
    const materia = await this.findOne(id);
    Object.assign(materia, dto);
    return this.repo.save(materia);
  }

  async remove(id: number) {
    const materia = await this.findOne(id);
    const actividades = await this.actividadesRepo.count({ where: { materiaId: id } });
    const sesiones = await this.sesionesRepo.count({ where: { materiaId: id } });
    if (actividades > 0 || sesiones > 0) {
      throw new ConflictException(
        'No se puede eliminar la materia porque tiene actividades o sesiones asociadas',
      );
    }
    await this.repo.remove(materia);
    return { mensaje: `Materia ${id} eliminada` };
  }

  async resumen(id: number) {
    const materia = await this.findOne(id);

    // Semana actual: desde el lunes a las 00:00
    const ahora = new Date();
    const inicioSemana = new Date(ahora);
    inicioSemana.setDate(ahora.getDate() - ((ahora.getDay() + 6) % 7));
    inicioSemana.setHours(0, 0, 0, 0);

    const sesiones = await this.sesionesRepo.find({
      where: { materiaId: id, inicio: MoreThanOrEqual(inicioSemana) },
    });
    const horas = sesiones.reduce(
      (total, s) => total + (s.fin.getTime() - s.inicio.getTime()) / 3600000,
      0,
    );
    const horasEstudiadas = Math.round(horas * 100) / 100;
    const meta = materia.metaHorasSemanales;

    return {
      materiaId: id,
      materia: materia.nombre,
      metaHorasSemanales: meta,
      horasEstudiadas,
      horasRestantes: Math.max(0, Math.round((meta - horasEstudiadas) * 100) / 100),
      metaCumplida: horasEstudiadas >= meta,
    };
  }
}