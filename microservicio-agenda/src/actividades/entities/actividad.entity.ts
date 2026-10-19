import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';

export enum EstadoActividad {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA = 'COMPLETADA',
}

@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'date' })
  fechaEntrega: string;

  @Column({ type: 'enum', enum: EstadoActividad, default: EstadoActividad.PENDIENTE })
  estado: EstadoActividad;

  @ManyToOne(() => Materia, (m) => m.actividades, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'materiaId' })
  materia: Materia;

  @Column()
  materiaId: number;
}