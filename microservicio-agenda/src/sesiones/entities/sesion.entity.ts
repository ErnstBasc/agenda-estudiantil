import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('sesiones')
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  inicio: Date;

  @Column({ type: 'timestamptz' })
  fin: Date;

  @Column({ type: 'text', nullable: true })
  notas?: string;

  @ManyToOne(() => Materia, (m) => m.sesiones, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'materiaId' })
  materia: Materia;

  @Column()
  materiaId: number;

  @ManyToOne(() => Actividad, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actividadId' })
  actividad?: Actividad | null;

  @Column({ type: 'int', nullable: true })
  actividadId?: number | null;
}
