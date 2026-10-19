import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from '../materias/entities/materia.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { Actividad } from './entities/actividad.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private readonly repo: Repository<Actividad>,
    @InjectRepository(Materia)
    private readonly materiasRepo: Repository<Materia>,
  ) {}

  private async verificarMateria(materiaId: number) {
    const existe = await this.materiasRepo.existsBy({ id: materiaId });
    if (!existe) {
      throw new NotFoundException(`Materia ${materiaId} no encontrada`);
    }
  }

  async create(dto: CreateActividadDto) {
    await this.verificarMateria(dto.materiaId);
    return this.repo.save(this.repo.create(dto));
  }

  findAll(materiaId?: number) {
    return this.repo.find({
      where: materiaId ? { materiaId } : {},
      order: { fechaEntrega: 'ASC' },
    });
  }

  async findOne(id: number) {
    const actividad = await this.repo.findOneBy({ id });
    if (!actividad) {
      throw new NotFoundException(`Actividad ${id} no encontrada`);
    }
    return actividad;
  }

  async update(id: number, dto: UpdateActividadDto) {
    const actividad = await this.findOne(id);
    if (dto.materiaId !== undefined) {
      await this.verificarMateria(dto.materiaId);
    }
    Object.assign(actividad, dto);
    return this.repo.save(actividad);
  }

  async remove(id: number) {
    const actividad = await this.findOne(id);
    await this.repo.remove(actividad);
    return { mensaje: `Actividad ${id} eliminada` };
  }
}