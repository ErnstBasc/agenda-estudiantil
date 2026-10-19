import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Materia } from '../materias/entities/materia.entity';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { Sesion } from './entities/sesion.entity';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private readonly repo: Repository<Sesion>,
    @InjectRepository(Materia)
    private readonly materiasRepo: Repository<Materia>,
    @InjectRepository(Actividad)
    private readonly actividadesRepo: Repository<Actividad>,
  ) {}

  private validarFechas(inicio: Date, fin: Date) {
    if (fin <= inicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la de inicio');
    }
  }

  private async verificarReferencias(materiaId: number, actividadId?: number | null) {
    const existe = await this.materiasRepo.existsBy({ id: materiaId });
    if (!existe) {
      throw new NotFoundException(`Materia ${materiaId} no encontrada`);
    }
    if (actividadId) {
      const actividad = await this.actividadesRepo.findOneBy({ id: actividadId });
      if (!actividad) {
        throw new NotFoundException(`Actividad ${actividadId} no encontrada`);
      }
      if (actividad.materiaId !== materiaId) {
        throw new BadRequestException('La actividad no pertenece a la materia indicada');
      }
    }
  }

  async create(dto: CreateSesionDto) {
    const inicio = new Date(dto.inicio);
    const fin = new Date(dto.fin);
    this.validarFechas(inicio, fin);
    await this.verificarReferencias(dto.materiaId, dto.actividadId);
    return this.repo.save(this.repo.create({ ...dto, inicio, fin }));
  }

  findAll(materiaId?: number) {
    return this.repo.find({
      where: materiaId ? { materiaId } : {},
      order: { inicio: 'DESC' },
    });
  }

  async findOne(id: number) {
    const sesion = await this.repo.findOneBy({ id });
    if (!sesion) {
      throw new NotFoundException(`Sesión ${id} no encontrada`);
    }
    return sesion;
  }

  async update(id: number, dto: UpdateSesionDto) {
    const sesion = await this.findOne(id);
    const inicio = dto.inicio ? new Date(dto.inicio) : sesion.inicio;
    const fin = dto.fin ? new Date(dto.fin) : sesion.fin;
    this.validarFechas(inicio, fin);
    const materiaId = dto.materiaId ?? sesion.materiaId;
    const actividadId = dto.actividadId !== undefined ? dto.actividadId : sesion.actividadId;
    await this.verificarReferencias(materiaId, actividadId);
    Object.assign(sesion, { ...dto, inicio, fin });
    return this.repo.save(sesion);
  }

  async remove(id: number) {
    const sesion = await this.findOne(id);
    await this.repo.remove(sesion);
    return { mensaje: `Sesión ${id} eliminada` };
  }
}